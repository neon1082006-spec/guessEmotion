async function analyze() {
  let text = document.getElementById("text").value;

  let res = await fetch(
    "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text })
    }
  );

  let data = await res.json();

  console.log(data); // 👈 thêm dòng này để debug

  if (data.error) {
    document.getElementById("result").innerText = "Đang load model, thử lại sau...";
    return;
  }

  let label = data[0].label || data[0][0].label;
  let score = (data[0].score || data[0][0].score).toFixed(2);

  document.getElementById("result").innerText =
    label + " (" + score + ")";
}