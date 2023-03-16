import { fetchRepos } from "./fetch-repos";

const searchForm = document.getElementById('search-form');
const inputReposName = document.getElementById('repos-name');
const inputReposNameError = document.getElementById('repos-name-error');
const btnSubmit = document.getElementById('btn-submit');

function checkBtnSubmit() {
  if (inputReposName.value && inputReposName.value.replace(/\s/g, '').length !== 0) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
}

inputReposName.addEventListener('input', (event) => {
  if (event.target.value) {
    event.target.style.borderColor = 'transparent';
    inputReposNameError.style.display = 'none';
  }
  checkBtnSubmit();
});

inputReposName.addEventListener('blur', (event) => {
  if (!event.target.value || event.target.value.replace(/\s/g, '').length === 0) {
    event.target.style.borderColor = '#f65281';
    inputReposNameError.style.display = 'block';
  }
  checkBtnSubmit();
});

inputReposName.addEventListener('keydown', (event) => {
  if(event.key === 'Enter' && inputReposName.value.replace(/\s/g, '').length !== 0) {
    void fetchRepos(inputReposName.value);
  }
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  void fetchRepos(inputReposName.value);
});






