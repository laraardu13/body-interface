const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const textsContainer = document.getElementById('texts');
const finalModal = document.getElementById('final-modal');
const tooltip = document.getElementById('tooltip');
const tracker = document.getElementById('tracker');

let img = new Image();
let destructionLevel = 0;
const MAX_DESTRUCTION = 10;

const messages = [
  "SUBJECT DETECTED",
  "ENGAGEMENT PATTERN IDENTIFIED",
  "IDENTITY SIMPLIFIED",
  "MEMORY COMPRESSION COMPLETE",
  "OPERATIONAL IMAGE GENERATED",
  "PREDICTIVE PROFILE UPDATED",
  "ORIGINAL IMAGE LOST",
  "SUBJECT FULLY INDEXED",
  "NO FURTHER INPUT REQUIRED",
  "I DON'T RECOGNIZE THIS BODY"
];

const conceptData = {
  SUBJECT: "The human body transformed into machine-readable data through surveillance and algorithmic classification.",

  ENGAGEMENT: "User behavior tracked, quantified, and monetized within systems of platform capitalism.",

  IDENTITY: "Personal identity simplified into metadata, behavioral patterns, and predictive categories.",

  MEMORY: "Human experience compressed into digital archives and platform memory systems.",

  IMAGE: "The visual self detached from physical reality and circulated as data.",

  BODY: "The body treated as an interface for extraction, surveillance, and behavioral analysis.",

  INDEXED: "The process of storing and categorizing identity within computational systems.",

  PATTERN: "Behavior interpreted through algorithmic prediction and automated recognition.",

  INPUT: "Human interaction reduced to measurable system activity.",

  OPERATIONAL: "An image used by machines to perform a task rather than to be viewed by humans.",

  PREDICTIVE: "A system that anticipates behavior by transforming previous actions into calculable patterns.",

  PROFILE: "A simplified data model of a person, built from traces of behavior and interaction."
};

const systemMessages = [
  "ATTENTION PROFILE UPDATED",
  "BEHAVIOR PATTERN STORED",
  "PREDICTIVE MODEL ACTIVE",
  "CONSENT IMPLIED",
  "VISUAL DATA ARCHIVED",
  "SUBJECT TRACE RECORDED",
  "PLATFORM-READABLE IDENTITY GENERATED",
  "MACHINE GAZE ACTIVE"
];

function processMessage(message) {
  Object.keys(conceptData).forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');

    message = message.replace(
      regex,
      `<span class="concept" data-info="${conceptData[word]}">${word}</span>`
    );
  });

  return message;
}

// image load

img.src = './assets/image.jpg';

img.onload = () => {
  console.log('image loaded', img.width, 'x', img.height);

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);

  updateCanvasTransform();
};

img.onerror = () => {
  console.error('image not found, check the file path');
  alert('IMAGE NOT FOUND');
};

// image destruction

function destroyImage() {
  destructionLevel++;

  console.log('click No', destructionLevel);

  spawnSystemMessage();

  const effects = [
    pixelate,
    glitch,
    rgbShift,
    noiseOverlay,
    sliceShift,
    blurPixel,
    invertBlocks,
    scanlines
  ];

  const effect = effects[Math.floor(Math.random() * effects.length)];

  effect();
}

function pixelate() {
  const factor = 4 + destructionLevel * 6;

  const temp = document.createElement('canvas');
  const tctx = temp.getContext('2d');

  temp.width = Math.floor(canvas.width / factor);
  temp.height = Math.floor(canvas.height / factor);

  tctx.drawImage(img, 0, 0, temp.width, temp.height);

  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);
}

function glitch() {
  ctx.drawImage(img, 0, 0);

  const numSlices = 10 + destructionLevel * 5;

  for (let i = 0; i < numSlices; i++) {
    const y = Math.random() * canvas.height;
    const h = Math.random() * 30 + 5;
    const shift = (Math.random() - 0.5) * destructionLevel * 40;

    ctx.drawImage(
      canvas,
      0,
      y,
      canvas.width,
      h,
      shift,
      y,
      canvas.width,
      h
    );
  }
}

function rgbShift() {
  ctx.drawImage(img, 0, 0);

  const shift = destructionLevel * 8;

  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = 0.5;

  ctx.drawImage(img, shift, 0);
  ctx.drawImage(img, -shift, shift);

  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
}

function noiseOverlay() {
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const intensity = destructionLevel * 20;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity;

    data[i] += noise;
    data[i + 1] += noise;
    data[i + 2] += noise;
  }

  ctx.putImageData(imageData, 0, 0);
}

function sliceShift() {
  ctx.drawImage(img, 0, 0);

  const slices = 5 + destructionLevel * 3;
  const sliceH = canvas.height / slices;

  for (let i = 0; i < slices; i++) {
    if (Math.random() > 0.5) {
      const y = i * sliceH;
      const shift = (Math.random() - 0.5) * destructionLevel * 60;

      ctx.drawImage(
        canvas,
        0,
        y,
        canvas.width,
        sliceH,
        shift,
        y,
        canvas.width,
        sliceH
      );
    }
  }
}

function blurPixel() {
  const factor = 2 + destructionLevel * 3;

  const temp = document.createElement('canvas');
  const tctx = temp.getContext('2d');

  temp.width = Math.floor(canvas.width / factor);
  temp.height = Math.floor(canvas.height / factor);

  tctx.drawImage(img, 0, 0, temp.width, temp.height);

  ctx.filter = `blur(${destructionLevel * 2}px)`;

  ctx.drawImage(temp, 0, 0, canvas.width, canvas.height);

  ctx.filter = 'none';
}

function invertBlocks() {
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const blockSize = 20;

  for (let y = 0; y < canvas.height; y += blockSize) {
    for (let x = 0; x < canvas.width; x += blockSize) {
      if (Math.random() > 0.7) {
        for (let dy = 0; dy < blockSize && y + dy < canvas.height; dy++) {
          for (let dx = 0; dx < blockSize && x + dx < canvas.width; dx++) {
            const idx = ((y + dy) * canvas.width + (x + dx)) * 4;

            data[idx] = 255 - data[idx];
            data[idx + 1] = 255 - data[idx + 1];
            data[idx + 2] = 255 - data[idx + 2];
          }
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

function scanlines() {
  ctx.drawImage(img, 0, 0);

  ctx.fillStyle = 'rgba(0,0,0,0.4)';

  for (let y = 0; y < canvas.height; y += 4) {
    ctx.fillRect(0, y, canvas.width, 2);
  }

  const shift = destructionLevel * 5;

  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = 'rgba(255, 0, 100, 0.15)';

  ctx.fillRect(shift, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = 'source-over';
}

// text bubbles

function showNextText() {
  if (destructionLevel > messages.length) return;

  const card = document.createElement('div');

  card.className = 'message-card';

  card.style.left = `${10 + Math.random() * 75}vw`;
  card.style.top = `${15 + Math.random() * 70}vh`;

  card.style.transform = `
    translate(-50%, -50%)
    rotate(${(Math.random() - 0.5) * 8}deg)
  `;

  card.innerHTML = `
    <span class="close-btn">✕</span>
    <p>${processMessage(messages[destructionLevel - 1])}</p>
  `;

  textsContainer.appendChild(card);

  setTimeout(() => {
    card.style.opacity = '1';
  }, 50);

  card.querySelector('.close-btn').addEventListener('click', e => {
    e.stopPropagation();

    card.style.opacity = '0';

    setTimeout(() => {
      card.remove();
    }, 400);
  });
}

function spawnSystemMessage() {
  const msg = document.createElement('div');

  msg.className = 'system-popup';

  msg.innerText =
    systemMessages[Math.floor(Math.random() * systemMessages.length)];

  msg.style.left = `${Math.random() * 80 + 10}vw`;
  msg.style.top = `${Math.random() * 80 + 10}vh`;

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 2000);
}

// main click interaction

canvas.addEventListener('click', e => {
  if (e.button !== 0) return;

  if (destructionLevel >= MAX_DESTRUCTION) {
    finalModal.classList.remove('hidden');
    return;
  }

  destroyImage();
  showNextText();
});

// zoom and drag

let scale = 1;
let isDragging = false;
let lastX;
let lastY;

let translateX = 0;
let translateY = 0;

function updateCanvasTransform() {
  canvas.style.transform = `
    translate(-50%, -50%)
    translate(${translateX}px, ${translateY}px)
    scale(${scale})
  `;
}

canvas.addEventListener('wheel', e => {
  e.preventDefault();

  const delta = e.deltaY > 0 ? 0.9 : 1.1;

  scale = Math.max(0.5, Math.min(scale * delta, 8));

  updateCanvasTransform();
});

canvas.addEventListener('mousedown', e => {
  isDragging = true;

  lastX = e.clientX;
  lastY = e.clientY;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;

  const dx = (e.clientX - lastX) * 1.2;
  const dy = (e.clientY - lastY) * 1.2;

  translateX += dx;
  translateY += dy;

  updateCanvasTransform();

  lastX = e.clientX;
  lastY = e.clientY;
});

// concept tooltip

document.addEventListener('click', e => {
  if (e.target.classList.contains('concept')) {
    e.stopPropagation();

    tooltip.innerText = e.target.dataset.info;

    tooltip.style.left = `${e.clientX + 15}px`;
    tooltip.style.top = `${e.clientY + 15}px`;

    tooltip.classList.add('visible');
  } else {
    tooltip.classList.remove('visible');
  }
});

// tracking cursor

document.addEventListener('mousemove', e => {
  tracker.style.left = `${e.clientX}px`;
  tracker.style.top = `${e.clientY}px`;
});

document.addEventListener('mousedown', () => {
  tracker.style.width = '48px';
  tracker.style.height = '48px';
});

document.addEventListener('mouseup', () => {
  tracker.style.width = '28px';
  tracker.style.height = '28px';
});



