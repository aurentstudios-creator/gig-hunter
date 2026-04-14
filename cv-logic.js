async function generateLuxuryCV() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Get Data
    const name = document.getElementById('fullName').value;
    const theme = document.getElementById('cvTheme').value;
    const summary = document.getElementById('summary').value;
    const edu = document.getElementById('education').value;
    const exp = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const photoInput = document.getElementById('passportPhoto');

    // Theme Config
    const colors = {
        modern_burgundy: { main: '#8b1e3f', text: '#ffffff', accent: '#ccac43' },
        tech_sleek: { main: '#102a56', text: '#ffffff', accent: '#ff6b35' },
        minimalist: { main: '#212121', text: '#ffffff', accent: '#eeeeee' }
    }[theme];

    // --- 🖋️ PDF DESIGN START ---
    
    // Left Sidebar (Luxury Background)
    doc.setFillColor(colors.main);
    doc.rect(0, 0, 70, 297, 'F');

    // Passport Photo Handling
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result;
            doc.addImage(imgData, 'JPEG', 10, 10, 50, 50); // Circular crop can be added later
            finalizePDF(doc, name, summary, edu, exp, skills, colors);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        finalizePDF(doc, name, summary, edu, exp, skills, colors);
    }
}

function finalizePDF(doc, name, summary, edu, exp, skills, colors) {
    // Name in Sidebar
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text(doc.splitTextToSize(name.toUpperCase(), 50), 10, 75);

    // Section Headers in Main Content
    doc.setTextColor(colors.main);
    doc.setFontSize(22);
    doc.text("PROFESSIONAL PROFILE", 80, 25);
    
    // Horizontal Line
    doc.setDrawColor(colors.accent);
    doc.setLineWidth(1);
    doc.line(80, 28, 200, 28);

    // Summary Text
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(summary, 120), 80, 38);

    // Experience Section
    doc.setTextColor(colors.main);
    doc.setFontSize(16);
    doc.text("EXPERIENCE", 80, 80);
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(exp, 120), 80, 90);

    // Education Section
    doc.setTextColor(colors.main);
    doc.setFontSize(16);
    doc.text("EDUCATION", 80, 160);
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(edu, 120), 80, 170);

    // Skills (Sidebar Bottom)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("CORE SKILLS", 10, 200);
    doc.setFontSize(9);
    doc.text(doc.splitTextToSize(skills.replace(/,/g, '\n• '), 50), 10, 210);

    // Footer Branding
    doc.setFillColor(33, 33, 33);
    doc.rect(70, 285, 140, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("GENERATED VIA AURENT VAULT LUXURY ENGINE 2026", 100, 292);

    doc.save(`${name.replace(/\s+/g, '_')}_Aurent_CV.pdf`);
}
