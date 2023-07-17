let NEXT_PAGE_TOKEN = null;
let num = 1;
const apiKey = "AIzaSyBKbNawzZpDkqSf6wvnXX2K0Tcsd7qw5ec";
const keyword = searchParam("keyword");

window.onload = async function () {
  await addData();

  const data = document.getElementsByClassName("add-data");
  console.log(data);
  data[0].addEventListener("click", async function () {
    const response = await fetch(
      `${
        keyword == null
          ? `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&regionCode=KR&type=channel&pageToken=${NEXT_PAGE_TOKEN}&key=${apiKey}`
          : `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&regionCode=KR&type=channel&pageToken=${NEXT_PAGE_TOKEN}&key=${apiKey}&q=${keyword}`
      }`
    );
    const values = await response.json();
    NEXT_PAGE_TOKEN = values.nextPageToken;
    console.log(values);
    var html = "";

    for (var i = 0; i < values.items.length; i++) {
      const value = values.items[i].snippet;
      console.log(value);
      html += `<li class="list">
                <a
                  href="./channel-detail.html"
                  class="list-item"
                >
                  <div class="list-number">${num++}.</div>
                  <div class="list-profile-img">
                    <img src="${value.thumbnails.default.url}" />
                  </div>
                  <div class="list-profile">
                    <div class="list-profile-title">${value.title}</div>
                  </div>
                  <img src="../images/icon/see-more.png" class="list-icon" />
                </a>
              </li>`;
    }

    $(".lists").append(html);
  });
};

function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}

async function addData() {
  const response = await fetch(
    `${
      keyword == null
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&regionCode=KR&type=channel&key=${apiKey}`
        : `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&regionCode=KR&type=channel&key=${apiKey}&q=${keyword}`
    }`
  );
  const values = await response.json();
  NEXT_PAGE_TOKEN = values.nextPageToken;
  console.log(values);
  var html = `<ul class="lists">`;

  for (var i = 0; i < values.items.length; i++) {
    const value = values.items[i].snippet;
    console.log(value);
    html += `<li class="list">
              <a
                href="./channel-detail.html?id=${value.channelId}"
                class="list-item"
              >
                <div class="list-number">${num++}.</div>
                <div class="list-profile-img">
                  <img src="${value.thumbnails.default.url}" />
                </div>
                <div class="list-profile">
                  <div class="list-profile-title">${value.title}</div>
                </div>
                <img src="../images/icon/see-more.png" class="list-icon" />
              </a>
            </li>`;
  }

  html += `</ul>
          <div class="add-data">+</div>`;

  $(".content").empty();
  $(".content").append(html);
}
