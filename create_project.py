import requests
import json
import os
from typing import Dict, List, Optional, Union
from pathlib import Path
from dotenv import load_dotenv # Import the new library

class GitHubRepoParser:
    def __init__(self, token: Optional[str] = None):
        self.token = token
        self.headers = {
            'Accept': 'application/vnd.github.v3+json',
        }
        if token:
            self.headers['Authorization'] = f'token {token}'
        
        self.projects_dir = Path('src/config/projects')
        self.projects_dir.mkdir(parents=True, exist_ok=True)

    # ... (the rest of the class methods are unchanged) ...
    def get_repo_contents(self, owner: str, repo: str, path: str = '') -> List[Dict]:
        """Get contents of a repository path"""
        url = f'https://api.github.com/repos/{owner}/{repo}/contents/{path}'
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def parse_directory(self, owner: str, repo: str, path: str = '') -> Dict:
        """Recursively parse a directory structure"""
        contents = self.get_repo_contents(owner, repo, path)
        result = {
            'name': Path(path).name if path else repo,
            'type': 'directory',
            'children': []
        }

        for item in contents:
            if item['type'] == 'dir':
                result['children'].append(self.parse_directory(owner, repo, item['path']))
            else:
                result['children'].append({
                    'name': item['name'],
                    'type': 'file',
                    'path': item.get('html_url') or item.get('download_url')
                })

        return result

    def create_project_json(self, owner: str, repo: str, title: str, description: str, 
                          repo_url: str, live_url: str, tech_stack: List[str]) -> Dict:
        """Create a project JSON object in the required format"""
        structure = self.parse_directory(owner, repo)
        
        return {
            'id': repo.lower(),
            'title': title,
            'description': description,
            'repoUrl': repo_url,
            'liveUrl': live_url,
            'techStack': tech_stack,
            'structure': {
                'root': repo,
                'children': structure['children']
            },
            'images': []
        }

    def save_project_json(self, project_json: Dict) -> str:
        """Save project JSON to file and return the relative path"""
        filename = f"{project_json['id']}.json"
        filepath = self.projects_dir / filename
        
        with open(filepath, 'w') as f:
            json.dump(project_json, f, indent=4)
        
        return str(filepath.relative_to('src/config'))

# --- Main function now reads from .env ---
def main():
    # Load environment variables from the .env file
    load_dotenv()
    
    # Get the token securely from the environment
    github_token = os.getenv("GITHUB_TOKEN")
    
    # Pass the token to the parser
    parser = GitHubRepoParser(token=github_token) 
    
    # --- Example Project: Edit these details for your project ---
    # This is where you will customize for each of your code-based projects
    project_json = parser.create_project_json(
        owner='SpacebarLabsLLC',
        repo='sblwebsite',
        title='Spacebar Labs Official Website',
        description='The official website and diegetic portal for Spacebar Labs, a narrative R&D shop. Built with Astro, React, and Tailwind CSS.',
        repo_url='https://github.com/SpacebarLabsLLC/sblwebsite',
        live_url='https://spacebarlabs.io',
        tech_stack=['Astro', 'React', 'Tailwind CSS', 'TypeScript', 'Cloudflare']
    )

    # Saves the file and tells you where it is
    project_path = parser.save_project_json(project_json)
    print(f"Project JSON saved to: {project_path}")
    print(f"Remember to import it into your userConfig.ts file!")


if __name__ == '__main__':
    main()