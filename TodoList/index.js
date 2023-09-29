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
}