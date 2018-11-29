function startTrinsion(doc,nowPosition) {
    doc.style.transition = 'all 0.2s';
    doc.style.webkitTransition = 'all 0.2s';
    doc.style.transform = 'translateY('+nowPosition+'px)';
    doc.style.webkitTransform = 'translateY('+nowPosition+'px)';
}