let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "bingo-vue-ifs.herokuapp.com":
    APIURL = "https://bingo-rails.herokuapp.com/";
}

export default APIURL;
