const saveButton = document.getElementById('save');
const restoreButton = document.getElementById('restore');

// continue this when localstorage converted to chrome storage
const localStoragetoFile = () => {};

saveButton.addEventListener('click', () => {
  alert('save button clicked');
});
restoreButton.addEventListener('click', () => {
  alert('restore button clicked');
});
