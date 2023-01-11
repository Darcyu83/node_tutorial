async function getUser() {
  try {
    const res = await axios.get("/users");
    const users = res.data;

    console.log("[ restFront.js ]::  users: ", users);

    const list = document.getElementById("list");
    list.innerHTML = "";

    Object.keys(users).map(function (key) {
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = users[key];

      // 수정 버튼 시작
      const edit = document.createElement("button");
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        const name = prompt("바꿀 이름을 입력하세요.");
        if (!name) {
          return alert("이름을 입력하셔야 합니다.");
        }

        try {
          await axios.put("/user/" + key, { name });

          getUser();
        } catch (err) {
          console.error(err);
        }
      });

      // 수정 버튼 끝

      // 삭제 버튼 시작
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        try {
          await axios.delete("/user/" + key);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      // 삭제 버튼 끝

      // HTML 구조 형성 단계

      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
      console.log("File::restFront.js");
      console.log(
        "File::%crestFront.js",
        "background-color: teal; color: white;",
        res.data
      );
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getUser;

// 폼 제출 (submit) 시 실행

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.username.value;

  if (!name) {
    return alert("이름을 입력하세요.");
  }

  try {
    await axios.post("/user", { name });

    getUser();
  } catch (err) {
    console.error(err);
  }

  e.target.username.value = "";
});
