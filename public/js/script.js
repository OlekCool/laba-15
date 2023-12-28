// Завантаження постів при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
  loadPosts();
});

function loadPosts() {
  fetch("js/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((posts) => {
      displayPosts(posts);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayPosts(posts) {
  var postsContainer = document.getElementById("interest_facts");
  posts.forEach(function (post, index) {
    var postElement = document.createElement("div");
    postElement.classList.add("fact", "fact" + (index + 1));
    postElement.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.content}</p>
        <div class="likes-section">
          <button id="like-button-${index}" onclick="toggleLike(${index})">❤</button>
          <p>Likes - <span id="like-count-${index}">${post.likes}</span></p>
        </div>
      `;
    postsContainer.appendChild(postElement);
  });
}

function toggleLike(index) {
  // Завантаження даних з data.json
  fetch("js/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((posts) => {
      // Зміна стану лайка для вибраного поста
      posts[index].likes += 1;

      // Відправлення змінених даних назад на сервер
      fetch("js/data.json", {
        method: "POST", // Використовуйте PUT, якщо сервер підтримує заміну ресурсу
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(posts),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
        })
        .catch((error) => {
          console.error("Error updating data.json:", error);
        });

      // Оновлення відображення кнопки та лічильника
      updateLikeButton(index, true);
      updateLikeCount(index, posts[index].likes);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function updateLikeButton(index, isLiked) {
  var likeButton = document.getElementById(`like-button-${index}`);
  likeButton.style.color = isLiked ? "red" : "black";
}

function updateLikeCount(index, likes) {
  var likeCount = document.getElementById(`like-count-${index}`);
  likeCount.textContent = likes;
}
