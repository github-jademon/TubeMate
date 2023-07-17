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
      `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&channelId=${id}&maxResults=7&key=${apiKey}`
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
              <img src="${channel.thumbnails.default.url}" />
              </div>
              <div class="list-profile-title">${channel.title}</div>
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
  const response1 = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&maxResults=1&key=${apiKey}`
  );
  const value1 = await response1.json();
  channel = value1.items[0].snippet;
  console.log(channel);

  const response2 = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${id}&maxResults=1&key=${apiKey}`
  );
  const value2 = await response2.json();
  const channel1 = value2.items[0].statistics;
  console.log(channel1);

  const response3 = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${id}&maxResults=1&key=${apiKey}`
  );
  const value3 = await response3.json();
  const channel2 = value3.items[0].brandingSettings;
  console.log(channel2);

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&channelId=${id}&maxResults=7&key=${apiKey}`
  );
  const values = await response.json();
  console.log(values);

  NEXT_PAGE_TOKEN = values.nextPageToken;

  var html = "";

  html += `<div class="channel-details">
            <div class="channel-banner-img">
              <img src="${channel2.image.bannerExternalUrl}" />
            </div>
            <div class="channel-profile">
              <div class="channel-profile-img">
                <img src="${channel.thumbnails.default.url}" />
              </div>
              <div class="channel-name">${channel.title}</div>
              <div class="channer-info">
                <div class="channel-count">구독자 ${channel1.subscriberCount}명</div>
                <div class="channel-date">동영상 ${channel1.videoCount}개</div>
              </div>
            </div>
            <div class="list">
              <div>소개</div>
              <img src="../images/icon/see-more.png" class="list-icon" />
              <div class="channel-description">${channel.description}</div>
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
      </a>
    </li>`;
  }

  html += `</ul>
          <div class="add-data">+</div>`;

  $(".content").empty();
  $(".content").append(html);
}
