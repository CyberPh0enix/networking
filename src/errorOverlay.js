window.addEventListener("error", function (e) {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.left = "0";
  div.style.zIndex = "999999";
  div.style.backgroundColor = "red";
  div.style.color = "white";
  div.style.padding = "20px";
  div.style.whiteSpace = "pre-wrap";
  div.style.width = "100vw";
  div.innerHTML = "CRASH: " + e.message + "<br><br>" + (e.error ? e.error.stack : "");
  document.body.appendChild(div);
});
