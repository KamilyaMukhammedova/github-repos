import { Octokit } from "octokit";

const octokit = new Octokit({});
const errorMsg = document.getElementById('error-msg');
const btnSubmit = document.getElementById('btn-submit');
const preloader = document.getElementById('preloader');

export async function fetchRepos(value) {
  try {
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
    btnSubmit.disabled = true;
    preloader.style.display = 'block';

    const result = await octokit.request(`GET /search/repositories?q=${value}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Origin': 'http://localhost:3000',
      },
      per_page: 10,
    });

    const repositories = result.data.items;

    if(repositories.length > 0) {
      localStorage.setItem('repos', JSON.stringify(result.data.items));
    }

    btnSubmit.disabled = false;
    preloader.style.display = 'none';
    console.log(result.data);
  } catch (error) {
    if (error.response) {
      const info = `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`;
      errorMsg.textContent = info;
      errorMsg.style.display = 'block';
      console.error(info);
    }
    console.error(error);
    preloader.style.display = 'none';
  }
}