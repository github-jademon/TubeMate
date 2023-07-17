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
          ? `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&pageToken=${NEXT_PAGE_TOKEN}&key=${apiKey}`
          : `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=10&pageToken=${NEXT_PAGE_TOKEN}&key=${apiKey}&q=${keyword}`
      }`
    );
    const values = await response.json();
    NEXT_PAGE_TOKEN = values.nextPageToken;
    console.log(values);
    var html = "";

    for (var i = 0; i < values.items.length; i++) {
      const value = values.items[i].snippet;
      console.log(value);
      const response1 = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${value.channelId}&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&key=${apiKey}`
      );
      const channel = await response1.json();
      html += `<li class="list">
                <a
                  href="./video-detail.html?id=${values.items[i].id}"
                  class="list-video-item list-item"
                >
                  <div class="list-number">${num++}.</div>
                  <div>
                    <img src="${value.thumbnails.default.url}" />
                  </div>
                  <div class="list-video">
                    <div class="list-video-title">${value.title}</div>
                    <div class="list-profile">
                      <div class="list-profile-img">
                      <img src="${
                        channel.items[0].snippet.thumbnails.default.url
                      }" />
                      </div>
                      <div class="list-profile-title">${
                        value.channelTitle
                      }</div>
                    </div>
                  </div>
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
        ? `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${apiKey}`
        : `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=10&key=${apiKey}&q=${keyword}`
    }`
  );
  const values = await response.json();
  NEXT_PAGE_TOKEN = values.nextPageToken;
  console.log(values);
  var html = `<ul class="lists">`;

  for (var i = 0; i < values.items.length; i++) {
    const value = values.items[i].snippet;
    console.log(value);
    const response1 = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${value.channelId}&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&key=${apiKey}`
    );
    const channel = await response1.json();
    html += `<li class="list">
              <a
                href="./video-detail.html?id=${
                  keyword ? values.items[i].id.videoId : values.items[i].id
                }"
                class="list-video-item list-item"
              >
                <div class="list-number">${num++}.</div>
                <div>
                  <img src="${value.thumbnails.default.url}" />
                </div>
                <div class="list-video">
                  <div class="list-video-title">${value.title}</div>
                  <div class="list-profile">
                    <div class="list-profile-img">
                    <img src="${
                      channel.items[0].snippet.thumbnails.default.url
                    }" />
                    </div>
                    <div class="list-profile-title">${value.channelTitle}</div>
                  </div>
                </div>
              </a>
            </li>`;
  }

  html += `</ul>
          <div class="add-data">+</div>`;

  $(".content").empty();
  $(".content").append(html);
}
