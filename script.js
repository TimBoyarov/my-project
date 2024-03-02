function sendTask() {
    var taskInput = document.getElementById("taskInput");
    var task = taskInput.value.trim();
    if (task !== "") {
        // Отправка задачи на сервер
        fetch('/send-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: task })
        })
        .then(response => response.text())
        .then(message => {
            // Вывод сообщения о статусе операции
            var statusMessage = document.getElementById("statusMessage");
            statusMessage.textContent = message;
            taskInput.value = "";
        })
        .catch(error => console.error('Ошибка:', error));
    } else {
        alert("Пожалуйста, введите задачу!");
    }
}
