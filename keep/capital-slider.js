(function () {
  "use strict";

  // Cache DOM elements and constants at startup
  const CONFIG = {
    minVal: 5000,
    maxVal: 500000,
    step: 5000,
    defaultValue: 250000,
    fullRangeLabel: "$5,000 - $500,000",
    loanLabels: [
      "$5K – $10K",
      "$10K – $25K",
      "$25K – $50K",
      "$50K – $100K",
      "$100K – $150K",
      "$150K – $250K",
      "$250K – $500K",
      "$500K+",
    ],
    thresholds: [10000, 25000, 50000, 100000, 150000, 250000, 500000],
  };

  let elements,
    formatter,
    firstRun = true;
  let rafId = null; // For throttling updates

  function initElements() {
    elements = {
      slider: document.getElementById("slider"),
      sliderValue: document.getElementById("slider-value"),
      rangeTrack: document.querySelector(".range-track"),
      formLinks: document.querySelectorAll(".to-form"),
    };

    // Early exit if critical elements missing
    if (!elements.slider || !elements.sliderValue || !elements.rangeTrack) {
      console.warn("TryKeep Slider: Required elements not found");
      return false;
    }

    return true;
  }

  function initFormatter() {
    formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  }

  function setupSlider() {
    const { slider } = elements;
    slider.min = CONFIG.minVal;
    slider.max = CONFIG.maxVal;
    slider.step = CONFIG.step;
    slider.value = CONFIG.defaultValue;
  }

  // Pure function for label calculation (easier to test)
  function getLabelIndex(value) {
    return CONFIG.thresholds.findIndex((threshold) => value <= threshold);
  }

  function calculatePercentage(value) {
    return ((value - CONFIG.minVal) / (CONFIG.maxVal - CONFIG.minVal)) * 100;
  }

  function getDisplayLabel(value) {
    if (firstRun) {
      firstRun = false;
      return CONFIG.fullRangeLabel;
    }
    return formatter.format(value);
  }

  function normalizeCategoryLabel(labelIndex) {
    const label =
      CONFIG.loanLabels[labelIndex] ||
      CONFIG.loanLabels[CONFIG.loanLabels.length - 1];
    return label
      .replace(/\u2009/g, "") // Remove thin spaces
      .replace(/\u2013/g, "-") // Replace en-dash with hyphen
      .replace(/ *- */g, "-"); // Normalize spacing around dashes
  }

  function updateVisuals(value, percentage, displayLabel) {
    elements.rangeTrack.style.width = percentage + "%";
    elements.sliderValue.textContent = displayLabel;
  }

  function updateURL(categoryLabel) {
    try {
      const url = new URL(window.location);
      url.searchParams.set("funding-amount", categoryLabel);
      window.history.replaceState({}, "", url.toString());
    } catch (error) {
      console.warn("TryKeep Slider: URL update failed", error);
    }
  }

  function updateFormLinks(categoryLabel) {
    elements.formLinks.forEach((link) => {
      try {
        const url = new URL(link.href);
        url.searchParams.set("funding-amount", categoryLabel);
        link.href = url.toString();
      } catch (error) {
        console.warn("TryKeep Slider: Form link update failed", error);
      }
    });
  }

  // Main update function with throttling
  function performUpdate() {
    const value = parseInt(elements.slider.value, 10);
    const labelIndex = getLabelIndex(value);
    const percentage = calculatePercentage(value);
    const displayLabel = getDisplayLabel(value);
    const categoryLabel = normalizeCategoryLabel(labelIndex);

    // Batch DOM updates
    updateVisuals(value, percentage, displayLabel);
    updateURL(categoryLabel);
    updateFormLinks(categoryLabel);

    rafId = null; // Reset RAF flag
  }

  function throttledUpdate() {
    if (rafId === null) {
      rafId = requestAnimationFrame(performUpdate);
    }
  }

  function init() {
    if (!initElements()) return;

    initFormatter();
    setupSlider();

    // Initial update
    performUpdate();

    // Event binding with throttling
    elements.slider.addEventListener("input", throttledUpdate, {
      passive: true,
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
