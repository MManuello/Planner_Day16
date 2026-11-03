let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTab(name) {
  document.getElementById('today').hidden = name !== 'today';
  document.getElementById('add').hidden = name !== 'add';
  document.getElementById('tab-today').classList.toggle('active', name === 'today');
  document.getElementById('tab-add').classList.toggle('active', name === 'add');
}



function render() {
  const list = document.getElementById('list');
  list.innerHTML = '';
  document.getElementById('empty').hidden = tasks.length > 0;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center gap-2';

    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'form-check-input';
    box.checked = task.done;
    box.onchange = function () {
      task.done = box.checked;
      save();
      render();
    };

    const label = document.createElement('span');
    label.className = 'flex-grow-1';
    label.textContent = (task.time || 'Anytime') + ' - ' + task.text;
    if (task.done) label.style.textDecoration = 'line-through';

    const edit = document.createElement('button');
    edit.className = 'btn btn-sm btn-outline-primary';
    edit.textContent = 'Edit';
    edit.onclick = function () {
      const newText = prompt('Edit task:', task.text);
      if (newText) {
        task.text = newText;
        save();
        render();
      }
    };

    const del = document.createElement('button');
    del.className = 'btn btn-sm btn-outline-danger';
    del.textContent = 'Delete';
    del.onclick = function () {
      tasks.splice(i, 1);
      save();
      render();
    };

    li.append(box, label, edit, del);
    list.append(li);
  }
}
document.getElementById('tab-today').onclick = function () { showTab('today'); };
document.getElementById('tab-add').onclick = function () { showTab('add'); };

document.getElementById('form').onsubmit = function (e) {
  e.preventDefault();
  const text = document.getElementById('text').value.trim();
  if (text === '') {
    document.getElementById('error').textContent = 'Enter a task.';
    return;
  }
  document.getElementById('error').textContent = '';
  tasks.push({ text: text, time: document.getElementById('time').value, done: false });
  save();
  document.getElementById('form').reset();
  render();
  showTab('today');
};
