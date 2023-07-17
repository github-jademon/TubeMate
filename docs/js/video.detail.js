let NEXT_PAGE_TOKEN = null;
let num = 1;
const apiKey = "AIzaSyBKbNawzZpDkqSf6wvnXX2K0Tcsd7qw5ec";
const id = searchParam("id");
let channel = null;

window.onload = async function () {
  await addData();
  const data = document.getElementsByClassName("add-data");
  data[0].addEventListener("click", async function () {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&channelId=${video1.channelId}&maxResults=7&key=${apiKey}`
    );
    const values = await response.json();
    console.log(values);

    NEXT_PAGE_TOKEN = values.nextPageToken;

    var html = "";

    for (var i = 0; i < values.items.length; i++) {
      const value = values.items[i].snippet;
      console.log(value);
      html += `<li class="list">
        <a
          href="./video-detail.html?id=${values.items[i].id.videoId}"
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
              <img src="${channel.snippet.thumbnails.default.url}" />
              </div>
              <div class="list-profile-title">${channel.title}</div>
            </div>
          </div>
          </div>
        </a>
      </li>`;
    }

    html += `</ul>
            <div class="add-data">+</div>`;

    $(".lists").append(html);
  });
};

function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}

async function addData() {
  const response1 = await fetch(
    `${
      id == null
        ? `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=1&key=${apiKey}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&maxResults=1&key=${apiKey}`
    }`
  );
  const value1 = await response1.json();
  const video1 = value1.items[0].snippet;
  console.log(video1);

  const response2 = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${value1.items[0].id}&maxResults=1&key=${apiKey}`
  );
  const value2 = await response2.json();
  const video2 = value2.items[0].statistics;
  console.log(video2);

  const response3 = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video1.channelId}&&key=${apiKey}`
  );
  const value3 = await response3.json();
  channel = value3.items[0].snippet;
  console.log(channel);

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&channelId=${video1.channelId}&maxResults=7&key=${apiKey}`
  );
  const values = await response.json();
  console.log(values);

  NEXT_PAGE_TOKEN = values.nextPageToken;

  var html = "";

  html += `<div class="video-details">
            <div class="video-detail-img">
              <iframe 
                width="380" height="200" 
                src="https://www.youtube.com/embed/${value1.items[0].id}" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; 
                  encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
              </iframe>
            </div>
            <div class="video-detail">
              <div class="video-title">${video1.title}</div>
              <div class="video-info">
                <div class="video-count">조회수 ${video2.viewCount}회</div>
                <div class="video-date">${video1.publishedAt} 전</div>
              </div>
            </div>
            <div class="list">
              <a
                href="./channel-detail.html?id=${video1.channelId}"
                class="list-item"
              >
                <div class="list-profile-img">
                  <img src="${channel.thumbnails.default.url}" />
                </div>
                <div class="list-profile">
                  <div class="list-profile-title">${channel.title}</div>
                </div>
                <img src="../images/icon/see-more.png" class="list-icon" />
              </a>
            </div>
          </div>`;

  html += `<ul class="lists">`;

  for (var i = 0; i < values.items.length; i++) {
    const value = values.items[i].snippet;
    console.log(value);
    html += `<li class="list">
      <a
        href="./video-detail.html?id=${values.items[i].id.videoId}"
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
            <img src="${channel.thumbnails.default.url}" />
            </div>
            <div class="list-profile-title">${channel.title}</div>
          </div>
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
