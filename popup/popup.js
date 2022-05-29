// backup button logic
backup = document.getElementById('backup');
backup.addEventListener('click', () => {
  chrome.storage.local.get(['userNotes'], (result) => {
    const fileToSave = JSON.stringify(result.userNotes, null, 2);
    // console.log('Currently downloading... ' + fileToSave);
    const url = 'data:text/plain,' + fileToSave;
    chrome.downloads.download({
      url: url,
      filename: 'userNotes.txt',
    });
  });
});

// restore button logic
const getFileText = () => {
  const [file] = document.getElementById('file').files;
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const data = reader.result;
    const finalData = JSON.parse(data);
    chrome.storage.local.set({ userNotes: finalData }, () => {
      // console.log('notes is set to ' + notes);
    });
    // alert(finalData);
  });

  if (file) {
    reader.readAsText(file);
  }
};

// restore success state logic
const setSuccess = () => {
  const successState = document.querySelector('.text--success');
  successState.innerText = 'Success! Refresh the browser to see changes';
  setTimeout(() => {
    successState.innerText = ' ';
  }, 5000);
};

// form submit
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getFileText();
  setSuccess();
});
