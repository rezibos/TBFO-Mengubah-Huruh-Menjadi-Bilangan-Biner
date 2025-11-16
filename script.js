const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page-content');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetPage = item.getAttribute('data-page');
        
        // Remove active class from all nav items and pages
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Add active class to clicked nav item and corresponding page
        item.classList.add('active');
        document.getElementById(`page-${targetPage}`).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ==================== NAVIGATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all nav items and pages
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding page
            this.classList.add('active');
            document.getElementById(`page-${targetPage}`).classList.add('active');
        });
    });
    
    // Initialize modal controls
    setupModalControls();
});

// ==================== DIAGRAM & VIDEO ====================
let currentZoom = 1;

// Data diagram dan video
const diagrams = {
    diagram1: {
        src: 'asset/mesin-turing/mesin-otomata.png',
        alt: 'Diagram State Mesin Turing untuk Konversi Huruf ke Biner'
    }
};

const videos = {
    video1: {
        src: 'asset/video-mesin-turing/video.mkv',
        title: 'Penjelasan Lengkap Mesin Turing'
    }
};

function viewDiagram(diagramId) {
    const diagram = diagrams[diagramId];
    if (!diagram) return;
    
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    modalImg.src = diagram.src;
    modalImg.alt = diagram.alt;
    currentZoom = 1;
    modalImg.style.transform = `scale(${currentZoom})`;
    modal.classList.add('active');
}

function playVideo(videoId) {
    const video = videos[videoId];
    if (!video) return;
    
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modalVideo.src = video.src;
    modal.classList.add('active');
    modalVideo.play();
}

function setupModalControls() {
    const imageModal = document.getElementById('imageModal');
    const videoModal = document.getElementById('videoModal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    
    // Close buttons
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // Click outside to close
    window.addEventListener('click', (e) => {
        if (e.target === imageModal || e.target === videoModal) {
            closeModals();
        }
    });
    
    // Zoom controls
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const resetZoomBtn = document.getElementById('resetZoom');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            currentZoom += 0.2;
            if (currentZoom > 3) currentZoom = 3;
            document.getElementById('modalImage').style.transform = `scale(${currentZoom})`;
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            currentZoom -= 0.2;
            if (currentZoom < 0.5) currentZoom = 0.5;
            document.getElementById('modalImage').style.transform = `scale(${currentZoom})`;
        });
    }
    
    if (resetZoomBtn) {
        resetZoomBtn.addEventListener('click', () => {
            currentZoom = 1;
            document.getElementById('modalImage').style.transform = `scale(${currentZoom})`;
        });
    }
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModals();
        }
    });
}

function closeModals() {
    const imageModal = document.getElementById('imageModal');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    imageModal.classList.remove('active');
    videoModal.classList.remove('active');
    
    // Stop video
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
}

// ==================== TURING MACHINE ====================

let simulationSteps = [];
let currentStepIndex = 0;
let isLoading = false;

const elems = {
    letterSelect: document.getElementById('letterSelect'),
    convertBtn: document.getElementById('convertBtn'),
    stepVisualization: document.getElementById('stepVisualization'),
    prevStep: document.getElementById('prevStep'),
    nextStep: document.getElementById('nextStep'),
    currentStep: document.getElementById('currentStep'),
    totalSteps: document.getElementById('totalSteps'),
    inputTapeCells: document.getElementById('inputTapeCells'),
    outputTapeCells: document.getElementById('outputTapeCells'),
    inputTapeHead: document.getElementById('inputTapeHead'),
    outputTapeHead: document.getElementById('outputTapeHead'),
    stateDisplay: document.getElementById('stateDisplay'),
    headPosDisplay: document.getElementById('headPosDisplay'),
    actionDisplay: document.getElementById('actionDisplay'),
    completionBadge: document.getElementById('completionBadge'),
    result: document.getElementById('result'),
    inputLetter: document.getElementById('inputLetter'),
    asciiCode: document.getElementById('asciiCode'),
    binaryResult: document.getElementById('binaryResult'),
    stepsTable: document.getElementById('stepsTable'),
    stepsTableBody: document.getElementById('stepsTableBody')
};

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function showToast(message, icon = 'info') {
    Toast.fire({
        icon: icon,
        title: message
    });
}

function showLoading(show = true) {
    isLoading = show;
    const convertBtn = elems.convertBtn;
    const clearBtn = document.getElementById('clearAll');
    
    if (show) {
        convertBtn.innerHTML = '<i class="fi fi-rr-refresh animate-spin"></i> Memproses...';
        convertBtn.disabled = true;
        clearBtn.disabled = true;
        document.body.style.cursor = 'wait';
    } else {
        convertBtn.innerHTML = '<i class="fi fi-rr-refresh"></i> Konversi';
        convertBtn.disabled = false;
        clearBtn.disabled = false;
        document.body.style.cursor = 'default';
    }
}

// ✅ MESIN TURING REAL YANG DIPERBAIKI
class RealTuringMachine {
    constructor(inputLetter) {
        // Validasi input
        if (!inputLetter || inputLetter.length !== 1) {
            throw new Error('Input harus berupa 1 karakter');
        }
        
        this.inputLetter = inputLetter;
        this.asciiCode = inputLetter.charCodeAt(0);
        
        // Validasi ASCII range (32-126 untuk printable characters)
        if (this.asciiCode < 32 || this.asciiCode > 126) {
            throw new Error('Karakter tidak didukung');
        }
        
        this.inputTape = [inputLetter];
        this.outputTape = Array(8).fill('_');
        
        this.state = 'q0';
        this.inputHead = 0;
        this.outputHead = 0;
        this.steps = [];
        this.binaryResult = '';
        this.currentBit = 7;
        this.remainingAscii = this.asciiCode;
        this.targetPosition = 0;
        
        this.initializeStep();
    }
    
    initializeStep() {
        this.steps.push({
            state: this.state,
            inputHead: this.inputHead,
            outputHead: this.outputHead,
            action: `Memulai: Huruf '${this.inputLetter}' (ASCII: ${this.asciiCode})`,
            inputTape: [...this.inputTape],
            outputTape: [...this.outputTape],
            move: '-',
            asciiValue: this.asciiCode,
            currentBit: this.currentBit,
            remainingAscii: this.remainingAscii
        });
    }
    
    addStep(action, move = 'S') {
        this.steps.push({
            state: this.state,
            inputHead: this.inputHead,
            outputHead: this.outputHead,
            action: action,
            inputTape: [...this.inputTape],
            outputTape: [...this.outputTape],
            move: move,
            asciiValue: this.asciiCode,
            currentBit: this.currentBit,
            remainingAscii: this.remainingAscii
        });
    }
    
    // ✅ TRANSITION FUNCTION YANG DIPERBAIKI
    transition() {
        let stepCount = 0;
        const maxSteps = 200; // Safety limit
        
        console.log(`=== KONVERSI ${this.inputLetter} (ASCII: ${this.asciiCode}) ===`);
        
        // State: q0 - Baca input
        this.state = 'q0';
        this.addStep(`Membaca huruf '${this.inputLetter}', ASCII: ${this.asciiCode}`);
        
        // Reset untuk perhitungan
        this.remainingAscii = this.asciiCode;
        this.currentBit = 7;
        
        while (this.state !== 'q_accept' && this.state !== 'q_reject' && stepCount < maxSteps) {
            stepCount++;
            
            let nextState = '';
            let moveDirection = 'S';
            let actionDescription = '';
            
            switch (this.state) {
                case 'q0': // Inisialisasi bit pertama
                    this.targetPosition = 7 - this.currentBit;
                    const power = Math.pow(2, this.currentBit);
                    const bitValue = (this.remainingAscii >= power) ? 1 : 0;
                    actionDescription = `Hitung bit ${this.targetPosition}: ${bitValue} (2^${this.currentBit}=${power}), sisa: ${this.remainingAscii}`;
                    nextState = 'q_move_to_target';
                    break;
                    
                case 'q_move_to_target': // Gerak ke posisi target
                    if (this.outputHead < this.targetPosition) {
                        moveDirection = 'R';
                        this.outputHead++;
                        actionDescription = `Gerak KANAN ke posisi ${this.outputHead} (target: ${this.targetPosition})`;
                        nextState = 'q_move_to_target';
                    } else if (this.outputHead > this.targetPosition) {
                        moveDirection = 'L';
                        this.outputHead--;
                        actionDescription = `Gerak KIRI ke posisi ${this.outputHead} (target: ${this.targetPosition})`;
                        nextState = 'q_move_to_target';
                    } else {
                        moveDirection = 'S';
                        actionDescription = `Sampai di posisi target ${this.targetPosition}`;
                        nextState = 'q_write_bit';
                    }
                    break;
                    
                case 'q_write_bit': // Tulis bit
                    {
                        const currentPower = Math.pow(2, this.currentBit);
                        const shouldBeOne = this.remainingAscii >= currentPower;
                        const bitValue = shouldBeOne ? 1 : 0;
                        
                        // Tulis ke tape
                        this.outputTape[this.outputHead] = bitValue.toString();
                        
                        // Kurangi remaining jika bit = 1
                        if (shouldBeOne) {
                            this.remainingAscii -= currentPower;
                        }
                        
                        moveDirection = 'S';
                        actionDescription = `Tulis '${bitValue}' di posisi ${this.outputHead} (bit ${this.targetPosition}) - Sisa: ${this.remainingAscii}`;
                        nextState = 'q_next_bit';
                    }
                    break;
                    
                case 'q_next_bit': // Siapkan bit berikutnya
                    this.currentBit--;
                    if (this.currentBit >= 0) {
                        this.targetPosition = 7 - this.currentBit;
                        const nextPower = Math.pow(2, this.currentBit);
                        const nextBitValue = (this.remainingAscii >= nextPower) ? 1 : 0;
                        moveDirection = 'S';
                        actionDescription = `Siap hitung bit ${this.targetPosition}: ${nextBitValue} (2^${this.currentBit}=${nextPower})`;
                        nextState = 'q_move_to_target';
                    } else {
                        moveDirection = 'S';
                        actionDescription = `Semua bit selesai, siap kembali ke posisi awal`;
                        nextState = 'q_return_home';
                    }
                    break;
                    
                case 'q_return_home': // Kembali ke posisi 0
                    if (this.outputHead > 0) {
                        moveDirection = 'L';
                        this.outputHead--;
                        actionDescription = `Kembali KIRI ke posisi ${this.outputHead}`;
                        nextState = 'q_return_home';
                    } else {
                        moveDirection = 'S';
                        this.binaryResult = this.outputTape.join('');
                        
                        // VALIDASI HASIL
                        const expectedBinary = this.asciiCode.toString(2).padStart(8, '0');
                        const isValid = this.binaryResult === expectedBinary;
                        
                        if (isValid) {
                            actionDescription = `✓ Konversi selesai: ${this.binaryResult} (Valid)`;
                            nextState = 'q_accept';
                        } else {
                            actionDescription = `✗ Konversi gagal: ${this.binaryResult} (Expected: ${expectedBinary})`;
                            nextState = 'q_reject';
                        }
                    }
                    break;
                    
                default:
                    nextState = 'q_reject';
                    actionDescription = 'State error: State tidak dikenali';
            }
            
            // Update state
            this.state = nextState;
            
            // Simpan step
            this.addStep(actionDescription, moveDirection);
            
            // Stop jika sudah selesai
            if (this.state === 'q_accept' || this.state === 'q_reject') {
                break;
            }
        }
        
        // Handle infinite loop
        if (stepCount >= maxSteps) {
            this.addStep('❌ Error: Terlalu banyak steps, kemungkinan infinite loop', 'S');
            this.state = 'q_reject';
            this.binaryResult = this.outputTape.join('');
        }
        
        console.log('State akhir:', this.state);
        console.log('Binary result:', this.binaryResult);
        console.log('Total steps:', this.steps.length);
        
        return {
            binary: this.binaryResult,
            steps: this.steps,
            success: this.state === 'q_accept',
            expected: this.asciiCode.toString(2).padStart(8, '0')
        };
    }
}

// ✅ FUNGSI KONVERSI DENGAN LOADING
function convertToBinary(letter) {
    return new Promise((resolve) => {
        // Simulasi loading singkat untuk UX yang better
        setTimeout(() => {
            console.log('=== MEMULAI KONVERSI REAL TURING ===');
            console.log('Huruf:', letter);
            console.log('ASCII:', letter.charCodeAt(0));
            
            const tm = new RealTuringMachine(letter);
            const result = tm.transition();
            
            console.log('Hasil akhir:', result.binary);
            console.log('Jumlah steps:', result.steps.length);
            console.log('=== KONVERSI SELESAI ===');
            
            resolve(result);
        }, 500);
    });
}

function initLetterSelect() {
    const letters = [];
    
    for (let i = 65; i <= 90; i++) letters.push(String.fromCharCode(i));
    for (let i = 97; i <= 122; i++) letters.push(String.fromCharCode(i));
    
    elems.letterSelect.innerHTML = '<option value="" selected disabled>Pilih huruf (A/a - Z/z)</option>';
    
    letters.forEach(letter => {
        const option = document.createElement('option');
        option.value = letter;
        option.textContent = letter;
        elems.letterSelect.appendChild(option);
    });
}

function renderStepVisualization() {
    if (simulationSteps.length === 0) return;
    
    const step = simulationSteps[currentStepIndex];
    
    elems.currentStep.textContent = currentStepIndex + 1;
    elems.totalSteps.textContent = simulationSteps.length;
    elems.stateDisplay.textContent = step.state;
    elems.headPosDisplay.textContent = step.outputHead;
    elems.actionDisplay.textContent = step.action;
    
    elems.prevStep.disabled = currentStepIndex === 0;
    elems.nextStep.disabled = currentStepIndex === simulationSteps.length - 1;
    
    elems.inputTapeCells.innerHTML = '';
    step.inputTape.forEach((cell, index) => {
        const cellElem = document.createElement('div');
        cellElem.className = `tape-cell ${index === step.inputHead ? 'current' : ''}`;
        cellElem.textContent = cell;
        elems.inputTapeCells.appendChild(cellElem);
    });
    
    elems.outputTapeCells.innerHTML = '';
    step.outputTape.forEach((cell, index) => {
        const cellElem = document.createElement('div');
        cellElem.className = `tape-cell ${index === step.outputHead ? 'current animate-pulse' : ''}`;
        
        if (cell !== '_') {
            cellElem.classList.add('modified');
        }
        
        cellElem.textContent = cell;
        elems.outputTapeCells.appendChild(cellElem);
    });
    
    if (step.outputTape.length > 0) {
        const outputCellWidth = 100 / step.outputTape.length;
        const outputHeadPosition = (step.outputHead * outputCellWidth) + (outputCellWidth / 2);
        elems.outputTapeHead.style.transition = 'left 0.3s ease-in-out';
        elems.outputTapeHead.style.left = `${outputHeadPosition}%`;
        elems.outputTapeHead.style.display = 'block';
    }
    
    elems.inputTapeHead.style.display = 'none';
    
    if (step.state === 'q_accept') {
        elems.completionBadge.style.display = 'inline-block';
        elems.completionBadge.classList.add('animate-bounce');
    } else {
        elems.completionBadge.style.display = 'none';
        elems.completionBadge.classList.remove('animate-bounce');
    }
}

function renderStepsTable() {
    if (simulationSteps.length === 0) return;
    
    elems.stepsTableBody.innerHTML = '';
    
    simulationSteps.forEach((step, index) => {
        const row = document.createElement('tr');
        
        if (index === currentStepIndex) {
            row.classList.add('current-step-row', 'animate-pulse');
        }
        
        const outputTapeDisplay = step.outputTape.map(cell => 
            cell === '_' ? '□' : cell
        ).join(' ');

        row.innerHTML = `
            <td style="font-weight: ${index === currentStepIndex ? 'bold' : 'normal'}">${index + 1}</td>
            <td style="font-family: 'Courier New', monospace;">${step.state}</td>
            <td>${step.outputHead}</td>
            <td style="text-align: left;">${step.action}</td>
            <td style="font-family: 'Courier New', monospace; color: ${getMoveColor(step.move)}">${step.move}</td>
            <td style="font-family: 'Courier New', monospace; letter-spacing: 2px; font-weight: bold;">${outputTapeDisplay}</td>
        `;
        
        elems.stepsTableBody.appendChild(row);
    });
}

function getMoveColor(move) {
    switch(move) {
        case 'R': return '#e53e3e';
        case 'L': return '#3182ce';
        case 'S': return '#38a169';
        default: return '#718096';
    }
}

function renderResult(letter, binary, ascii) {
    elems.result.style.display = 'block';
    elems.result.classList.add('animate-fade-in');
    
    elems.inputLetter.textContent = `"${letter}"`;
    elems.asciiCode.textContent = ascii;
    
    if (binary && binary.length === 8 && !binary.includes('_')) {
        elems.binaryResult.textContent = binary;
        elems.binaryResult.classList.add('animate-pulse');
    } else {
        const fallbackBinary = ascii.toString(2).padStart(8, '0');
        elems.binaryResult.textContent = fallbackBinary;
    }
}

elems.convertBtn.addEventListener('click', async () => {
    const selectedLetter = elems.letterSelect.value;
    
    if (!selectedLetter) {
        showToast('Pilih huruf terlebih dahulu', 'warning');
        return;
    }
    
    console.log('🔴 MEMULAI KONVERSI REAL TURING UNTUK:', selectedLetter);
    
    try {
        const result = await convertToBinary(selectedLetter);
        simulationSteps = result.steps;
        currentStepIndex = 0;
        
        console.log('🟢 HASIL KONVERSI:', result.binary);
        console.log('🟢 EXPECTED:', result.expected);
        console.log('🟢 SUCCESS:', result.success);
        console.log('🟢 TOTAL STEPS:', result.steps.length);
        
        // Tampilkan visualisasi
        elems.stepVisualization.style.display = 'block';
        elems.stepVisualization.classList.add('animate-fade-in');
        renderStepVisualization();
        
        // Tampilkan tabel
        elems.stepsTable.style.display = 'block';
        renderStepsTable();
        
        // Tampilkan hasil
        const asciiCode = selectedLetter.charCodeAt(0);
        renderResult(selectedLetter, result.binary, asciiCode);
        
        // Beri feedback berdasarkan hasil
        if (result.success) {
            showToast(`✓ '${selectedLetter}' = ${result.binary} (${result.steps.length} steps)`, 'success');
        } else {
            showToast(`✗ Konversi gagal. Expected: ${result.expected}`, 'error');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showToast(`Error: ${error.message}`, 'error');
    }
});

document.getElementById('clearAll').addEventListener('click', () => {
    Swal.fire({
        title: 'Hapus Semua?',
        text: 'Semua data dan progress akan dihapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e25858',
        cancelButtonColor: '#4CAF50',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal',
        showClass: {
            popup: 'animate-fade-in'
        },
        hideClass: {
            popup: 'animate-fade-out'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Tampilkan loading dulu
            Swal.fire({
                title: 'Menghapus...',
                text: 'Sedang menghapus semua data',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Animasi fade out sebelum hapus
            elems.stepVisualization.classList.add('animate-fade-out');
            elems.result.classList.add('animate-fade-out');
            
            setTimeout(() => {
                elems.letterSelect.value = "";
                simulationSteps = [];
                currentStepIndex = 0;
                
                elems.stepVisualization.style.display = 'none';
                elems.result.style.display = 'none';
                elems.stepsTable.style.display = 'none';
                
                // Reset classes
                elems.stepVisualization.classList.remove('animate-fade-out', 'animate-fade-in');
                elems.result.classList.remove('animate-fade-out', 'animate-fade-in');
                
                elems.stateDisplay.textContent = "-";
                elems.headPosDisplay.textContent = "-";
                elems.actionDisplay.textContent = "-";
                elems.currentStep.textContent = "0";
                elems.totalSteps.textContent = "0";
                
                elems.inputTapeCells.innerHTML = '';
                elems.outputTapeCells.innerHTML = '';
                elems.stepsTableBody.innerHTML = '';
                
                // Setelah selesai, tampilkan centang
                setTimeout(() => {
                    Swal.fire({
                        title: 'Berhasil!',
                        text: 'Semua data telah dihapus',
                        icon: 'success',
                        confirmButtonColor: '#4CAF50',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }, 300);
                
            }, 300);
        }
    });
});

elems.prevStep.addEventListener('click', () => {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStepVisualization();
        renderStepsTable();
    }
});

elems.nextStep.addEventListener('click', () => {
    if (currentStepIndex < simulationSteps.length - 1) {
        currentStepIndex++;
        renderStepVisualization();
        renderStepsTable();
    }
});

initLetterSelect();
console.log('Aplikasi Mesin Turing REAL dengan animasi siap!');