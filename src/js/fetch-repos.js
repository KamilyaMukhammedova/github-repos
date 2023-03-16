import {Octokit} from "octokit";

const octokit = new Octokit({});
const errorMsg = document.getElementById('error-msg');
const btnSubmit = document.getElementById('btn-submit');
const preloader = document.getElementById('preloader');
const repositoriesBlock = document.getElementById('repositories');
const noResults = document.getElementById('no-results');

function onResponseError() {
  localStorage.setItem('repos', JSON.stringify([]));
  preloader.style.display = 'none';
  repositoriesBlock.innerHTML = '';
  errorMsg.style.display = 'block';
}

export async function fetchRepos(value) {
  try {
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
    noResults.style.display = 'none';
    preloader.style.display = 'block';
    btnSubmit.disabled = true;

    const result = await octokit.request(`GET /search/repositories?q=${value}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Origin': 'http://localhost:3000',
      },
      per_page: 10,
    });

    const repositories = result.data.items;

    if (repositories.length > 0) {
      localStorage.setItem('repos', JSON.stringify(repositories));
      window.location.reload();
    } else {
      localStorage.setItem('repos', JSON.stringify([]));
      preloader.style.display = 'none';
      repositoriesBlock.innerHTML = '';
      noResults.style.display = 'block';
    }
  } catch (error) {
    onResponseError();

    if (error.response) {
      const errorInfo = `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`;
      errorMsg.textContent = errorInfo;
      console.error(errorInfo);
    } else {
      errorMsg.textContent = 'Error! Try again.';
      console.error(error);
    }
  }
}

