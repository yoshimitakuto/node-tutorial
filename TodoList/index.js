const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const hostName = "localhost";

app.use(express.static('statics'));

// DOM操作用の定数
const ulRef = document.querySelector("ul");
const inputRef = document.querySelector("#todo-task");
const selectRef = document.querySelector("#todo-status");
const editItemIdRef = document.querySelector("#edit-item-id");
const submitButtonRef = document.querySelector("#sbumit-button");
const cancelButtonRef = document.querySelector("#cancel-button");

const url = "http://localhost:3000";

// ステータス表示
const getStatusName = (status) => //三項演算子使用
    status === 1 
     ? "IMCOMPLETE"
     : status === 2
     ? "PROGRESS"
     : status === 3
     ? "PENDING"
     : "COMPLETE";

// キャンセルボタンの処理（値を空にする）
const handleResetForm = () => {
    inputRef.value = "";
    selectRef.value = "";
    editItemIdRef = "";
    submitButtonRef.textContent = "Add Item";
};

// 編集ボタンの処理（値をフォームへ配置）
const handleSelectEditItem = ({ id, task, status }) => {
    inputRef.value = task;
    selectRef.value = status;
    editItemIdRef.value = id;
    submitButtonRef.textContent = "Edit Item";
};

// APIリクエスト（非同期処理）
const handleGetItems = async () => {
    const res = await fetch(`${url}/todo`);
    const todos = await res.json();

    while (ulRef.firstChild) { //編集や削除の際に際レンダリングを行うが、その時にデータを取得したままにしておくと追加で内容が表示されてしまうため、一度while文を使ってデータを削除する
        ulRef.removeChild(ulRef.firstChild);
    }

    todos.forEach((todo) => {
        const spanRef = document.createElement("span");
        const liRef = document.createElement("li");
        spanRef.textContent = `${todo.task} - ${getStatusName(todo.status)}`;
        liRef.appendChild(spanRef);

        const editButtonRef = document.createElement("button");
        editButtonRef.textContent = "edit";
        liRef.appendChild(editButtonRef);
        editButtonRef.addEventListener('click', () => 
            handleSelectEditItem({
                id: todo.id,
                task: todo.task,
                status: todo.status,
            })
        );

        const deleteButtonRef = document.createElement("button");
        deleteButtonRef.textContent = "delete";
        liRef.appendChild(deleteButtonRef);
        deleteButtonRef.addEventListener('click', () => handleDeleteItem(todo.id))

        ulRef.appendChild(liRef);
    });
};

window.addEventListener("load", handleGetItems); //データ取得の処理は画面が読み込まれたら実行する処理を記述

// 追加（作成）
const handleAddItem = async () => {
    const value = inputRef.value;
    const status = selectRef.value;
    await fetch(`${url}/todo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", //jsonでfetchを使ってAPIリクエストをする際はこの記述が必要
        },
        body: JSON.stringify({ task: value, status }), //オブジェクトをJSON文字列に変換する必要があるためstringifyを使用する
    });
    await handleGetItems();
};

// 編集
const handleEditItem = async () => {
    const id = editItemIdRef.value;
    const task = inputRef.value;
    const status = selectRef.value;
    await fetch(`${url}/todo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, status }),
    });
    await handleGetItems();
};

// 削除
const handleDeleteItem = async (id) => {
    await fetch(`${url}/todo/${id}`, {
        method: "DELETE",
    });
    await handleGetItems();
};

submitButtonRef.addEventListener('click', async () => {
    if (submitButtonRef.textContent === "Edit Item") {
        await handleEditItem();
    } else {
        await handleAddItem();
    }
    handleResetForm();
});

cancelButtonRef.addEventListener('click', handleResetForm);

app.listen(port, () => {
    console.log(`Server running at http://${hostName}:${port}/ 🚀`);
});
