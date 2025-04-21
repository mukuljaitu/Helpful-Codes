(function() {
  const table = document.querySelector('.table.yf-1jecxey.noDl.hideOnPrint');
  if (!table) {
    alert('Table not found!');
    return;
  }

  const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.innerText.trim());
  const rows = Array.from(table.querySelectorAll('tbody tr')).map(row =>
    Array.from(row.querySelectorAll('td')).map(td => td.innerText.trim())
  );

  // Clear page and setup styles
  document.body.innerHTML = '';
  document.body.style.fontFamily = 'Arial, sans-serif';
  document.body.style.padding = '20px';
  document.body.style.backgroundColor = '#f4f4f4';

  // Generate tab-separated values (TSV)
  const tsvRows = [headers, ...rows];
  const tsvData = tsvRows.map(row => row.join('\t')).join('\n');

  // Create copy button
  const copyBtn = document.createElement('button');
  copyBtn.textContent = '📋 Copy to Clipboard';
  copyBtn.style.padding = '10px 20px';
  copyBtn.style.marginBottom = '20px';
  copyBtn.style.fontSize = '16px';
  copyBtn.style.cursor = 'pointer';
  copyBtn.style.backgroundColor = '#007bff';
  copyBtn.style.color = 'white';
  copyBtn.style.border = 'none';
  copyBtn.style.borderRadius = '5px';
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(tsvData).then(() => {
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => copyBtn.textContent = '📋 Copy to Clipboard', 2000);
    });
  };

  // Create <pre> block to display TSV
  const pre = document.createElement('pre');
  pre.textContent = tsvData;
  pre.style.backgroundColor = '#fff';
  pre.style.padding = '20px';
  pre.style.border = '1px solid #ccc';
  pre.style.overflowX = 'auto';

  // Append everything to body
  document.body.appendChild(copyBtn);
  document.body.appendChild(pre);
})();
