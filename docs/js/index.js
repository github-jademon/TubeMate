const apiKey = "AIzaSyBKbNawzZpDkqSf6wvnXX2K0Tcsd7qw5ec";

window.onload = function () {
  addData();
};

async function addData() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=KR&key=${apiKey}`
  );
  const values = await response.json();
  console.log(values);

  var html = "";

  for (var i = 0; i < values.items.length; i++) {
    html += `<li class="list">
              <div class="list-item">
                <div class="list-number">${i + 1}.</div>
                <div class="list-profile-title">#${
                  values.items[i].snippet.title
                }</div>
                <div class="list-profile-link">
                  <a
                    href="./pages/rank-video.html?keyword=${
                      values.items[i].snippet.title
                    }"
                    class="list-prifile-link-item"
                  >
                    <div>동영상</div>
                    <img src="./images/icon/see-more.png" class="list-icon" />
                  </a>
                  <a
                    href="./pages/rank-channel.html?keyword=${
                      values.items[i].snippet.title
                    }"
                    class="list-prifile-link-item"
                  >
                    <div>유튜브채널</div>
                    <img src="./images/icon/see-more.png" class="list-icon" />
                  </a>
                </div>
              </div>
            </li>`;
  }

  $(".lists").empty();
  $(".lists").append(html);

  console.log("hiiiiiii");
}
