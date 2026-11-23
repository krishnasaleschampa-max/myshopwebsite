
    document.addEventListener("DOMContentLoaded", () => {
      const C = window.SHOP_CONFIG;
      if (!C) return;

      const refreshIcons = () => {
        if (window.lucide) window.lucide.createIcons();
      };

      const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
      };

      const setAttr = (id, attr, val) => {
        const el = document.getElementById(id);
        if (el) el.setAttribute(attr, val);
      };

      // 1. Branding & Top Info
      document.title = `${C.brand.name} | ${C.brand.tagline}`;
      setText("top-badge", `${C.brand.name} · ${C.brand.badge} · ${C.brand.locationBadge}`);
      setText("top-hours", C.location.hoursBadge);
      setText("top-phone", C.contact.phoneDisplay);
      setAttr("top-phone", "href", `tel:${C.contact.phoneHref}`);

      setText("nav-brand-name", C.brand.name.toUpperCase());
      setText("nav-brand-sub", C.brand.tagline);
      setAttr("header-call-btn", "href", `tel:${C.contact.phoneHref}`);
      setAttr("header-whatsapp-btn", "href", `https://wa.me/${C.contact.whatsappNumber}?text=${encodeURIComponent(C.contact.whatsappDefaultMessage)}`);

      setText("hero-badge-tag", C.brand.badge);
      setText("hero-location-tag", C.brand.locationBadge);
      setText("hero-title-main", C.brand.heroHeadingMain);
      setText("hero-title-accent", C.brand.heroHeadingAccent);
      setText("hero-desc", C.brand.heroDescription);
      setAttr("hero-whatsapp-link", "href", `https://wa.me/${C.contact.whatsappNumber}?text=${encodeURIComponent(C.contact.whatsappDefaultMessage)}`);

      setText("hero-card-address", `${C.location.addressLine1}, ${C.location.city}`);
      setAttr("hero-card-directions", "href", C.location.googleMapsDirectionsUrl);
      setAttr("hero-card-call", "href", `tel:${C.contact.phoneHref}`);
      setAttr("store-direction-btn", "href", C.location.googleMapsDirectionsUrl);

      // Render Stats Bar
      const statsContainer = document.getElementById("stats-container");
      if (statsContainer && C.stats) {
        statsContainer.innerHTML = C.stats.map(s => `
          <div class="space-y-1">
            <span class="text-xs font-mono text-stone-400 block">${s.label}</span>
            <div class="font-display text-3xl sm:text-4xl text-amberBrand-accent">${s.value}</div>
            <span class="text-[11px] text-stone-500 font-mono block">${s.subtext}</span>
          </div>
        `).join("");
      }

      // Storefront Gallery Interactive Selector
      const gallery = C.storefrontGallery || [];
      const storePreviewImg = document.getElementById("store-preview-img");
      const storePreviewTag = document.getElementById("store-preview-tag");
      const storePreviewTitle = document.getElementById("store-preview-title");
      const storePreviewSub = document.getElementById("store-preview-sub");
      const storeThumbnails = document.getElementById("store-thumbnails");

      if (storeThumbnails && gallery.length > 0) {
        storeThumbnails.innerHTML = gallery.map((item, idx) => `
          <button class="store-thumb-btn rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all relative ${idx === 0 ? 'border-amberBrand-accent ring-2 ring-amberBrand-accent/30' : 'border-white/10 opacity-70 hover:opacity-100'}" data-index="${idx}">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
          </button>
        `).join("");

        document.querySelectorAll(".store-thumb-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.index);
            const item = gallery[idx];
            if (!item) return;

            document.querySelectorAll(".store-thumb-btn").forEach(b => {
              b.classList.remove("border-amberBrand-accent", "ring-2", "ring-amberBrand-accent/30");
              b.classList.add("border-white/10", "opacity-70");
            });
            btn.classList.add("border-amberBrand-accent", "ring-2", "ring-amberBrand-accent/30");
            btn.classList.remove("border-white/10", "opacity-70");

            storePreviewImg.style.opacity = '0';
            setTimeout(() => {
              storePreviewImg.src = item.image;
              storePreviewTag.textContent = item.tag;
              storePreviewTitle.textContent = item.title;
              storePreviewSub.textContent = item.subtitle;
              storePreviewImg.style.opacity = '1';
            }, 150);
          });
        });
      }

      // Store Details & Map
      setText("store-hours-weekday", C.location.hoursWeekday);
      setText("store-hours-sunday", C.location.hoursSunday);
      setText("store-phone-link", C.contact.phoneDisplay);
      setAttr("store-phone-link", "href", `tel:${C.contact.phoneHref}`);
      setText("store-wa-link", `WhatsApp: ${C.contact.whatsappDisplay}`);
      setAttr("store-wa-link", "href", `https://wa.me/${C.contact.whatsappNumber}`);
      setAttr("store-map-iframe", "src", C.location.googleMapsEmbedUrl);

      // ==================== EXACT COLOUR HARMONIZER (1:1 VIDEO) ====================
      const harmonizerData = window.COLOR_HARMONIZER || {};
      const tonalFamilies = harmonizerData.tonalFamilies || [
        { name: "Whites", tone: "#EFEFEA", text: "#25231F" },
        { name: "Yellows", tone: "#E0BA4A", text: "#25231F" },
        { name: "Oranges", tone: "#D58643", text: "#25231F" },
        { name: "Reds", tone: "#A8494D", text: "#FFFFFF" },
        { name: "Purples", tone: "#7B618E", text: "#FFFFFF" },
        { name: "Blues", tone: "#4E7197", text: "#FFFFFF" },
        { name: "Blue-Greens", tone: "#386F71", text: "#FFFFFF" },
        { name: "Greens", tone: "#536C4A", text: "#FFFFFF" },
        { name: "Yellow-Greens", tone: "#899540", text: "#25231F" },
        { name: "Neutrals: Browns & Greys", tone: "#80736A", text: "#FFFFFF" }
      ];
      const signatureShades = harmonizerData.signatureShades || [
        { name: "Linen story", code: "NN 1004", hex: "#D9D1BD", textColor: "#171817", family: "Whites" },
        { name: "Sunlit clay", code: "YR 2078", hex: "#D68D4D", textColor: "#171817", family: "Oranges" },
        { name: "Quiet moss", code: "YG 8083", hex: "#55725E", textColor: "#FFFFFF", family: "Greens" },
        { name: "Walled garden", code: "GG 5036", hex: "#304B3E", textColor: "#FFFFFF", family: "Greens" },
        { name: "After rain", code: "BB 5087", hex: "#7889A9", textColor: "#FFFFFF", family: "Blues" },
        { name: "Perfectly honest", code: "RR 3076", hex: "#B84D4A", textColor: "#FFFFFF", family: "Reds" }
      ];

      let activeFamilyName = "Whites";
      let activeShadeIndex = 0;
      let harmonizerTimer = null;

      const familyFocusCard = document.getElementById("family-focus-card");
      const focusFamilyName = document.getElementById("focus-family-name");
      const focusFamilyLink = document.getElementById("focus-family-link");
      const tonalFamiliesList = document.getElementById("tonal-families-list");
      const roomShadeFigure = document.getElementById("room-shade-figure");
      const roomShadeWash = document.getElementById("room-shade-wash");
      const roomShadeCaption = document.getElementById("room-shade-caption");
      const swatchesRow = document.getElementById("swatches-row");

      const applyShade = (shade) => {
        if (!shade) return;
        if (roomShadeFigure) roomShadeFigure.style.setProperty("--room-shade", shade.hex);
        if (roomShadeWash) roomShadeWash.style.backgroundColor = shade.hex;
        if (roomShadeCaption) roomShadeCaption.textContent = `${shade.name} · ${shade.code}`;

        document.querySelectorAll(".swatch").forEach(btn => {
          if (btn.dataset.code === shade.code) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      };

      const setTonalFamily = (familyName) => {
        activeFamilyName = familyName;
        const fam = tonalFamilies.find(f => f.name === familyName) || tonalFamilies[0];
        
        if (familyFocusCard) {
          familyFocusCard.style.setProperty("--family-tone", fam.tone);
          familyFocusCard.style.setProperty("--family-text", fam.text);
        }
        if (focusFamilyName) focusFamilyName.textContent = fam.name;
        if (focusFamilyLink) {
          focusFamilyLink.href = `https://wa.me/917067905867?text=${encodeURIComponent(`Hello Krishna Sales! I am interested in exploring the ${fam.name} colour family for my rooms.`)}`;
        }

        document.querySelectorAll(".colour-family-list button").forEach(btn => {
          const isSelected = btn.dataset.family === familyName;
          btn.classList.toggle("active", isSelected);
          const em = btn.querySelector("em");
          if (em) em.textContent = isSelected ? "Selected" : "Select family";
        });

        // Find signature shade matching family, or default
        const matchingShade = signatureShades.find(s => s.family === familyName) || signatureShades[0];
        applyShade(matchingShade);
      };

      // Render 10 Tonal Families buttons
      if (tonalFamiliesList) {
        tonalFamiliesList.innerHTML = tonalFamilies.map(f => `
          <button type="button" class="${f.name === activeFamilyName ? 'active' : ''}" data-family="${f.name}">
            <span style="background: ${f.tone};"></span>
            <strong>${f.name}</strong>
            <em>${f.name === activeFamilyName ? 'Selected' : 'Select family'}</em>
          </button>
        `).join("");

        tonalFamiliesList.querySelectorAll("button").forEach(btn => {
          btn.addEventListener("click", () => {
            setTonalFamily(btn.dataset.family);
          });
        });
      }

      // Render 6 Signature Swatches
      if (swatchesRow) {
        swatchesRow.innerHTML = signatureShades.map((s, idx) => `
          <button type="button" class="swatch ${idx === 0 ? 'active' : ''}" data-code="${s.code}" style="--swatch: ${s.hex}; --text: ${s.textColor};" aria-pressed="${idx === 0}">
            <span class="swatch-code">${s.code}</span>
            <span class="swatch-name">${s.name}</span>
            <span class="swatch-index">0${idx + 1} / 06</span>
          </button>
        `).join("");

        swatchesRow.querySelectorAll(".swatch").forEach(btn => {
          btn.addEventListener("click", () => {
            const found = signatureShades.find(s => s.code === btn.dataset.code);
            if (found) {
              applyShade(found);
              // also switch family focus
              setTonalFamily(found.family);
            }
          });
        });
      }

      // Auto cycle room shade every 5.5 seconds (matching user video)
      harmonizerTimer = setInterval(() => {
        activeShadeIndex = (activeShadeIndex + 1) % signatureShades.length;
        const currentShade = signatureShades[activeShadeIndex];
        applyShade(currentShade);
        setTonalFamily(currentShade.family);
      }, 5500);

      // Initial apply
      applyShade(signatureShades[0]);
      setTonalFamily("Whites");


      // ==================== PRODUCT CATALOG (124 FORMULATIONS) MULTI-PAGE =================
      const masterProducts = window.MASTER_PRODUCTS || C.products || [];
      const categoryPills = document.getElementById("category-pills");
      const productsGrid = document.getElementById("products-grid");
      const productsPagination = document.getElementById("products-pagination");
      const productsCountBadge = document.getElementById("products-count-badge");
      const catalogSearch = document.getElementById("catalog-search");
      const catalogSort = document.getElementById("catalog-sort");
      const compareTray = document.getElementById("compare-tray");
      const compareCount = document.getElementById("compare-count");
      const openCompareModalBtn = document.getElementById("open-compare-modal-btn");
      const clearCompareBtn = document.getElementById("clear-compare-btn");
      const compareModal = document.getElementById("compare-modal");
      const compareModalGrid = document.getElementById("compare-modal-grid");
      const closeCompareModalBtn = document.getElementById("close-compare-modal-btn");
      const favouritesCountPill = document.getElementById("favourites-count-pill");
      const favCountNum = document.getElementById("fav-count-num");

      let currentCat = "all";
      let searchStr = "";
      let currentSort = "featured";
      let currentPage = 1;
      const itemsPerPage = 12;

      const favouritesSet = new Set();
      const compareSet = new Set();

      // Extract unique categories with exact counts
      const categoryCounts = {};
      masterProducts.forEach(p => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
      });

      const catalogCategories = [
        { id: "all", name: "All Formulations", count: masterProducts.length },
        { id: "Interior Paints", name: "Interior Paints", count: categoryCounts["Interior Paints"] || 0 },
        { id: "Exterior Paints", name: "Exterior Paints", count: categoryCounts["Exterior Paints"] || 0 },
        { id: "Waterproofing", name: "Waterproofing", count: categoryCounts["Waterproofing"] || 0 },
        { id: "Enamels", name: "Enamels", count: categoryCounts["Enamels"] || 0 },
        { id: "Wood Finishes", name: "Wood Finishes", count: categoryCounts["Wood Finishes"] || 0 },
        { id: "Tools", name: "Tools", count: categoryCounts["Tools"] || 0 },
        { id: "Wallpapers", name: "Wallpapers", count: categoryCounts["Wallpapers"] || 0 },
        { id: "Aerosols", name: "Aerosols", count: categoryCounts["Aerosols"] || 0 }
      ].filter(c => c.count > 0 || c.id === "all");

      // Render Category Pills
      const renderCatPills = () => {
        if (!categoryPills) return;
        categoryPills.innerHTML = catalogCategories.map(c => `
          <button class="cat-pill-btn px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all ${c.id === currentCat ? 'bg-amberBrand-accent text-black font-bold shadow-lg scale-105' : 'bg-white/5 text-stone-300 hover:bg-white/10 border border-white/10'}" data-cat="${c.id}">
            <span>${c.name}</span>
            <span class="ml-1 text-[10px] opacity-75 font-mono">(${c.count})</span>
          </button>
        `).join("");

        document.querySelectorAll(".cat-pill-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            currentCat = btn.dataset.cat;
            currentPage = 1;
            renderCatPills();
            renderCatalog();
          });
        });
      };

      // Filter and sort products
      const getFilteredProducts = () => {
        let list = masterProducts.filter(p => {
          const matchCat = (currentCat === "all") || (p.category === currentCat);
          const matchSearch = !searchStr ||
            p.name.toLowerCase().includes(searchStr) ||
            p.copy.toLowerCase().includes(searchStr) ||
            p.family.toLowerCase().includes(searchStr) ||
            p.category.toLowerCase().includes(searchStr);
          return matchCat && matchSearch;
        });

        if (currentSort === "name-asc") {
          list.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === "name-desc") {
          list.sort((a, b) => b.name.localeCompare(a.name));
        } else if (currentSort === "family") {
          list.sort((a, b) => a.family.localeCompare(b.family));
        }

        return list;
      };

      // Render Catalog Grid with Multi-Page Pagination
      const renderCatalog = () => {
        if (!productsGrid) return;

        const filtered = getFilteredProducts();
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        const pageItems = filtered.slice(startIndex, endIndex);

        // Update count badge
        if (productsCountBadge) {
          productsCountBadge.textContent = totalItems > 0 
            ? `SHOWING ${startIndex + 1}–${endIndex} OF ${totalItems} MASTER FORMULATIONS`
            : "NO FORMULATIONS FOUND";
        }

        if (totalItems === 0) {
          productsGrid.innerHTML = `
            <div class="col-span-full py-16 text-center text-stone-400 font-mono text-sm space-y-3">
              <i data-lucide="package-search" class="w-12 h-12 mx-auto text-stone-600"></i>
              <p>No formulations found matching "${searchStr}".</p>
              <button onclick="document.getElementById('catalog-search').value=''; window.resetMasterFilter();" class="px-4 py-2 rounded bg-white/10 text-white text-xs hover:bg-white/20">Clear Search</button>
            </div>
          `;
          if (productsPagination) productsPagination.innerHTML = "";
          refreshIcons();
          return;
        }

        // Render Cards (matching user video)
        productsGrid.innerHTML = pageItems.map((p, i) => {
          const isFav = favouritesSet.has(p.slug);
          const isCompare = compareSet.has(p.slug);
          const itemNumber = String(startIndex + i + 1).padStart(2, '0');

          return `
            <article class="product-card" data-slug="${p.slug}">
              <div class="product-image-stage">
                
                <div class="product-topline">
                  <span>${p.category}</span>
                  <span>${itemNumber}</span>
                </div>

                <div class="product-can with-image image-ready" style="--can-colour: ${p.colour || '#e5a93b'}; --can-text: ${p.text || '#ffffff'};">
                  <span class="product-can-pack">
                    <img src="${p.imageUrl}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80';" />
                  </span>
                  <span class="product-can-glow"></span>
                </div>

                <div class="product-utility">
                  <button type="button" class="fav-toggle-btn ${isFav ? 'active' : ''}" data-slug="${p.slug}" title="Save formulation">
                    <i data-lucide="heart" class="w-3.5 h-3.5 ${isFav ? 'fill-pink-500 text-pink-500' : ''}"></i>
                    <span>${isFav ? 'Saved' : 'Favourite'}</span>
                  </button>
                  <button type="button" class="compare-toggle-btn ${isCompare ? 'active' : ''}" data-slug="${p.slug}" title="Compare formulation">
                    <i data-lucide="layers" class="w-3.5 h-3.5"></i>
                    <span>${isCompare ? 'Added' : 'Compare'}</span>
                  </button>
                </div>
              </div>

              <div class="product-card-copy">
                <h3>${p.name}</h3>
                <p>${p.copy}</p>
                <div class="product-card-actions-row">
                  <button class="product-card-action details-btn" data-slug="${p.slug}">
                    Official details →
                  </button>
                  <a class="product-order-wa-btn" href="https://wa.me/917067905867?text=${encodeURIComponent(`Hello Krishna Sales! I would like to inquire about Birla Opus ${p.name} (${p.category}).`)}" target="_blank">
                    WhatsApp ↗
                  </a>
                </div>
              </div>
            </article>
          `;
        }).join("");

        // Render Pagination Controls
        if (productsPagination && totalPages > 1) {
          let pagesHtml = `
            <button class="page-nav-btn px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-stone-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
              &larr; Prev
            </button>
          `;

          // Generate page pills with ellipsis
          for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
              pagesHtml += `
                <button class="page-num-btn px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${i === currentPage ? 'bg-amberBrand-accent text-black font-bold shadow-md' : 'bg-white/5 border border-white/10 text-stone-300 hover:bg-white/10'}" data-page="${i}">
                  ${i}
                </button>
              `;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
              pagesHtml += `<span class="px-1 text-stone-500 font-mono">...</span>`;
            }
          }

          pagesHtml += `
            <button class="page-nav-btn px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-stone-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
              Next &rarr;
            </button>
          `;

          productsPagination.innerHTML = pagesHtml;

          document.querySelectorAll(".page-num-btn, .page-nav-btn").forEach(btn => {
            btn.addEventListener("click", () => {
              const targetPage = parseInt(btn.dataset.page);
              if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
                currentPage = targetPage;
                renderCatalog();
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }
            });
          });
        } else if (productsPagination) {
          productsPagination.innerHTML = "";
        }

        // Attach Card Listeners (Details, Favourites, Compare)
        document.querySelectorAll(".view-master-detail-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const slug = btn.dataset.slug;
            const product = masterProducts.find(p => p.slug === slug);
            if (product) openMasterProductModal(product);
          });
        });

        document.querySelectorAll(".fav-toggle-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const slug = btn.dataset.slug;
            if (favouritesSet.has(slug)) {
              favouritesSet.delete(slug);
            } else {
              favouritesSet.add(slug);
            }
            updateFavPill();
            renderCatalog();
          });
        });

        document.querySelectorAll(".compare-toggle-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const slug = btn.dataset.slug;
            if (compareSet.has(slug)) {
              compareSet.delete(slug);
            } else {
              if (compareSet.size >= 3) {
                alert("You can compare up to 3 formulations at once.");
                return;
              }
              compareSet.add(slug);
            }
            updateCompareTray();
            renderCatalog();
          });
        });

        refreshIcons();
      };

      const updateFavPill = () => {
        if (!favouritesCountPill || !favCountNum) return;
        if (favouritesSet.size > 0) {
          favouritesCountPill.classList.remove("hidden");
          favouritesCountPill.classList.add("flex");
          favCountNum.textContent = favouritesSet.size;
        } else {
          favouritesCountPill.classList.add("hidden");
          favouritesCountPill.classList.remove("flex");
        }
      };

      const updateCompareTray = () => {
        if (!compareTray || !compareCount) return;
        if (compareSet.size >= 2) {
          compareTray.classList.remove("hidden");
          compareTray.classList.add("flex");
          compareCount.textContent = compareSet.size;
        } else {
          compareTray.classList.add("hidden");
          compareTray.classList.remove("flex");
        }
      };

      if (clearCompareBtn) {
        clearCompareBtn.addEventListener("click", () => {
          compareSet.clear();
          updateCompareTray();
          renderCatalog();
        });
      }

      // Compare Modal
      if (openCompareModalBtn && compareModal && compareModalGrid) {
        openCompareModalBtn.addEventListener("click", () => {
          const selectedList = masterProducts.filter(p => compareSet.has(p.slug));
          if (selectedList.length === 0) return;

          compareModalGrid.innerHTML = selectedList.map(p => `
            <div class="bg-obsidian-900 rounded-xl border border-white/10 p-5 space-y-4">
              <div class="aspect-square p-4 flex items-center justify-center bg-obsidian-950 rounded-lg">
                <img src="${p.imageUrl}" alt="${p.name}" class="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <span class="text-[10px] font-mono text-amberBrand-accent uppercase">${p.category}</span>
                <h4 class="font-display text-xl text-white mt-1">${p.name}</h4>
                <p class="text-xs text-stone-400 mt-2 line-clamp-3">${p.copy}</p>
              </div>
              <div class="text-xs font-mono space-y-2 pt-3 border-t border-white/10 text-stone-300">
                <div class="flex justify-between">
                  <span class="text-stone-500">Family:</span>
                  <span class="text-white">${p.family}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-stone-500">Tone Base:</span>
                  <span class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full border border-white/20" style="background-color: ${p.colour};"></span>
                    <span class="text-stone-400">${p.colour}</span>
                  </span>
                </div>
              </div>
              <a href="https://wa.me/${C.contact.whatsappNumber}?text=${encodeURIComponent(`Hello Krishna Sales, I want to inquire about *${p.name}*.`)}" target="_blank" class="w-full py-2.5 rounded-lg bg-whatsapp text-white font-mono text-xs font-bold flex items-center justify-center gap-2">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                <span>Order via WhatsApp</span>
              </a>
            </div>
          `).join("");

          compareModal.classList.remove("hidden");
          compareModal.classList.add("flex");
          refreshIcons();
        });
      }

      if (closeCompareModalBtn && compareModal) {
        closeCompareModalBtn.addEventListener("click", () => {
          compareModal.classList.add("hidden");
          compareModal.classList.remove("flex");
        });
      }

      window.resetMasterFilter = () => {
        currentCat = "all";
        searchStr = "";
        currentSort = "featured";
        currentPage = 1;
        renderCatPills();
        renderCatalog();
      };

      if (catalogSearch) {
        catalogSearch.addEventListener("input", (e) => {
          searchStr = e.target.value.toLowerCase().trim();
          currentPage = 1;
          renderCatalog();
        });
      }

      if (catalogSort) {
        catalogSort.addEventListener("change", (e) => {
          currentSort = e.target.value;
          currentPage = 1;
          renderCatalog();
        });
      }

      renderCatPills();
      renderCatalog();

      // Master Product Modal Handler
      const modal = document.getElementById("product-modal");
      const openMasterProductModal = (p) => {
        if (!modal) return;
        document.getElementById("modal-img").src = p.imageUrl;
        document.getElementById("modal-badge").textContent = `${p.family} Series`;
        document.getElementById("modal-title").textContent = p.name;
        document.getElementById("modal-category").textContent = `${p.category} · Official Birla Opus Master Formulation`;
        document.getElementById("modal-desc").textContent = p.copy;
        document.getElementById("modal-sheen").textContent = p.family === "One" ? "Ultra-Luxury Sheen" : "Rich Velvet Washable";
        document.getElementById("modal-warranty").textContent = p.category.includes("Exterior") ? "10-Year Protection" : "8-Year Durability";
        document.getElementById("modal-scrub").textContent = "50,000+ Wash Cycles";
        document.getElementById("modal-coverage").textContent = "130 – 160 sq.ft / Litre";

        const hlList = document.getElementById("modal-highlights");
        hlList.innerHTML = `
          <li class="flex items-center gap-2">
            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>
            <span>Active stain-repellent & dirt-pick-up barrier</span>
          </li>
          <li class="flex items-center gap-2">
            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>
            <span>Computerized shade repeatability across all 2,500+ color cards</span>
          </li>
          <li class="flex items-center gap-2">
            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>
            <span>100% factory sealed original container with manufacturer warranty</span>
          </li>
        `;

        const waBtn = document.getElementById("modal-wa-btn");
        waBtn.href = `https://wa.me/${C.contact.whatsappNumber}?text=${encodeURIComponent(`Hello Krishna Sales, I am inquiring about *${p.name}* (${p.category}, Family: ${p.family}). Please share price and stock at your Champa store.`)}`;

        modal.classList.remove("hidden");
        modal.classList.add("flex");
        refreshIcons();
      };

      const closeModal = () => {
        if (!modal) return;
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      };

      document.getElementById("modal-close-btn")?.addEventListener("click", closeModal);
      document.getElementById("modal-cancel-btn")?.addEventListener("click", closeModal);
      modal?.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });

      // Calculator Logic
      const calcAreaRange = document.getElementById("calc-area-range");
      const calcAreaInput = document.getElementById("calc-area-input");
      let selectedType = "interior-repaint";
      let selectedTier = "luxury";

      const updateCalculator = () => {
        const area = parseInt(calcAreaInput.value) || 900;
        
        let coverageSqFtPerLitre = 140; // 2 coats
        let pricePerLitre = 480;
        let recoName = "Royale Luxury Washable Emulsion";

        if (selectedTier === "luxury") {
          pricePerLitre = 520;
          recoName = "Royale Luxury Washable Emulsion";
        } else if (selectedTier === "premium") {
          pricePerLitre = 380;
          recoName = "Premium Satin Interior Emulsion";
        } else {
          pricePerLitre = 240;
          recoName = "Tractor Fresh Distemper & Emulsion";
        }

        if (selectedType === "exterior-facade") {
          coverageSqFtPerLitre = 65;
          pricePerLitre = (selectedTier === "luxury") ? 590 : 420;
          recoName = "All-Weather Ultimate Exterior Shield";
        }

        const topcoatLitres = Math.ceil(area / coverageSqFtPerLitre);
        const topcoatMax = Math.ceil(topcoatLitres * 1.15);
        const primerLitres = Math.ceil(area / 180);
        const puttyKg = Math.ceil(area * 0.05);

        const estCostMin = Math.round(topcoatLitres * pricePerLitre + primerLitres * 150 + puttyKg * 30);
        const estCostMax = Math.round(estCostMin * 1.25);

        setText("calc-topcoat-litres", `${topcoatLitres} – ${topcoatMax} Litres`);
        setText("calc-product-recommendation", recoName);
        setText("calc-primer-litres", `${primerLitres} – ${primerLitres + 2} Litres`);
        setText("calc-putty-kg", `${puttyKg} Kg`);
        setText("calc-cost-estimate", `₹ ${estCostMin.toLocaleString('en-IN')} – ₹ ${estCostMax.toLocaleString('en-IN')}`);

        const waText = `Hello Krishna Sales, I calculated paint for my ${area} sq.ft (${selectedType}, ${selectedTier} grade) in Champa. It estimated ~${topcoatLitres}L of ${recoName}. Can you give me your best quote?`;
        setAttr("calc-whatsapp-btn", "href", `https://wa.me/${C.contact.whatsappNumber}?text=${encodeURIComponent(waText)}`);
      };

      if (calcAreaRange && calcAreaInput) {
        calcAreaRange.addEventListener("input", (e) => {
          calcAreaInput.value = e.target.value;
          updateCalculator();
        });
        calcAreaInput.addEventListener("input", (e) => {
          calcAreaRange.value = e.target.value;
          updateCalculator();
        });
      }

      document.querySelectorAll(".calc-type-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".calc-type-btn").forEach(b => {
            b.classList.remove("border-amberBrand-accent", "bg-amberBrand-accent/15", "text-amberBrand-accent", "font-bold");
            b.classList.add("border-white/15", "bg-obsidian-900", "text-stone-300");
          });
          btn.classList.add("border-amberBrand-accent", "bg-amberBrand-accent/15", "text-amberBrand-accent", "font-bold");
          btn.classList.remove("border-white/15", "bg-obsidian-900", "text-stone-300");
          selectedType = btn.dataset.type;
          updateCalculator();
        });
      });

      document.querySelectorAll(".calc-tier-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".calc-tier-btn").forEach(b => {
            b.classList.remove("border-amberBrand-accent", "bg-amberBrand-accent/15", "text-amberBrand-accent", "font-bold");
            b.classList.add("border-white/15", "bg-obsidian-900", "text-stone-300");
          });
          btn.classList.add("border-amberBrand-accent", "bg-amberBrand-accent/15", "text-amberBrand-accent", "font-bold");
          btn.classList.remove("border-white/15", "bg-obsidian-900", "text-stone-300");
          selectedTier = btn.dataset.tier;
          updateCalculator();
        });
      });

      updateCalculator();

      // Render Service Journey Stack
      const servicesStack = document.getElementById("services-stack");
      if (servicesStack && C.services) {
        servicesStack.innerHTML = C.services.map(s => `
          <div class="glass-card rounded-2xl p-6 space-y-4 hover:border-amberBrand-accent/40 transition-colors">
            <div class="flex items-center justify-between">
              <span class="font-display text-4xl text-amberBrand-accent/40">${s.step}</span>
              <div class="w-10 h-10 rounded-lg bg-amberBrand-accent/10 border border-amberBrand-accent/20 flex items-center justify-center text-amberBrand-accent">
                <i data-lucide="${s.icon || 'shield'}" class="w-5 h-5"></i>
              </div>
            </div>
            <h4 class="font-display text-xl text-white leading-tight">${s.title}</h4>
            <p class="text-xs text-amberBrand-400 font-mono">${s.tagline}</p>
            <p class="text-xs text-stone-400 font-light leading-relaxed">${s.description}</p>
          </div>
        `).join("");
      }

      // Render Room Ideas
      const ideasGrid = document.getElementById("ideas-grid");
      if (ideasGrid && C.ideas) {
        ideasGrid.innerHTML = C.ideas.map(i => `
          <div class="glass-card rounded-2xl overflow-hidden group">
            <div class="aspect-[4/3] overflow-hidden relative">
              <img src="${i.image}" alt="${i.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent"></div>
              <span class="absolute top-3 right-3 bg-obsidian-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-stone-300 border border-white/10">
                ${i.room}
              </span>
            </div>
            <div class="p-5 space-y-1">
              <h4 class="font-display text-lg text-white">${i.title}</h4>
              <p class="text-xs text-amberBrand-accent font-mono">${i.shade}</p>
            </div>
          </div>
        `).join("");
      }

      // Render Running Testimonials Marquees
      const track1 = document.getElementById("marquee-track-1");
      const track2 = document.getElementById("marquee-track-2");
      const reviews = C.reviews || [];

      if (reviews.length > 0) {
        const createCard = (r) => `
          <div class="w-[320px] sm:w-[380px] shrink-0 p-5 rounded-2xl glass-card border border-white/10 hover:border-amberBrand-accent/50 hover:bg-obsidian-850/90 transition-all flex flex-col justify-between space-y-4">
            <div class="space-y-2.5">
              <div class="flex items-center justify-between">
                <div class="flex text-amberBrand-400">
                  ${Array(r.rating).fill('<i data-lucide="star" class="w-3.5 h-3.5 fill-amberBrand-400"></i>').join('')}
                </div>
                <span class="text-[10px] font-mono text-stone-500">${r.date}</span>
              </div>
              <p class="text-xs text-stone-300 font-light leading-relaxed italic line-clamp-3">"${r.text}"</p>
              ${r.project ? `<span class="inline-block text-[10px] font-mono text-peacock-cyan bg-peacock-cyan/10 px-2 py-0.5 rounded border border-peacock-cyan/20">${r.project}</span>` : ''}
            </div>

            <div class="pt-3 border-t border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amberBrand-500 to-peacock-cyan text-black font-display text-sm font-bold flex items-center justify-center shrink-0">
                  ${r.initials || r.name.charAt(0)}
                </div>
                <div>
                  <strong class="text-white block font-sans text-xs leading-tight">${r.name}</strong>
                  <span class="text-[10px] font-mono text-stone-400">${r.role} · ${r.location || 'Champa'}</span>
                </div>
              </div>
              <span class="text-[9px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
                <i data-lucide="check-circle" class="w-3 h-3"></i> Verified
              </span>
            </div>
          </div>
        `;

        // Split reviews across two tracks for variety
        const set1 = reviews.slice(0, Math.ceil(reviews.length / 2));
        const set2 = reviews.slice(Math.ceil(reviews.length / 2));

        // Duplicate each set so that the marquee loops smoothly without jump
        const loopSet1 = [...set1, ...set1, ...set1];
        const loopSet2 = [...set2, ...set2, ...set2];

        if (track1) track1.innerHTML = loopSet1.map(createCard).join("");
        if (track2) track2.innerHTML = loopSet2.map(createCard).join("");
        refreshIcons();

        // Cycling Live Social Proof Toast at bottom-left
        const toast = document.getElementById("social-proof-toast");
        const toastName = document.getElementById("toast-name");
        const toastText = document.getElementById("toast-text");
        const toastLoc = document.getElementById("toast-loc");

        if (toast && reviews.length > 0) {
          let reviewIdx = 0;
          const showNextReviewToast = () => {
            const r = reviews[reviewIdx];
            if (!r) return;
            if (toastName) toastName.textContent = r.name;
            if (toastText) toastText.textContent = `"${r.text}"`;
            if (toastLoc) toastLoc.textContent = `${r.location || 'Champa'} · ${r.project || 'Paints & Hardware'}`;

            toast.classList.remove("translate-y-20", "opacity-0");
            toast.classList.add("translate-y-0", "opacity-100");

            setTimeout(() => {
              toast.classList.remove("translate-y-0", "opacity-100");
              toast.classList.add("translate-y-20", "opacity-0");
            }, 5500);

            reviewIdx = (reviewIdx + 1) % reviews.length;
          };

          // Start after 2.5s and cycle every 9s
          setTimeout(showNextReviewToast, 2500);
          setInterval(showNextReviewToast, 9500);
        }
      }

      // Render FAQ Accordion
      const faqAccordion = document.getElementById("faq-accordion");
      if (faqAccordion && C.faqs) {
        faqAccordion.innerHTML = C.faqs.map((f, idx) => `
          <div class="border border-white/10 rounded-xl bg-obsidian-850 overflow-hidden">
            <button class="faq-btn w-full p-4 text-left flex items-center justify-between text-sm font-sans font-medium text-white hover:text-amberBrand-accent transition-colors" data-index="${idx}">
              <span>${f.q}</span>
              <i data-lucide="chevron-down" class="faq-chevron w-4 h-4 text-stone-400 shrink-0 transition-transform"></i>
            </button>
            <div class="faq-answer hidden px-4 pb-4 text-xs font-mono text-stone-400 leading-relaxed border-t border-white/5 pt-3">
              ${f.a}
            </div>
          </div>
        `).join("");

        document.querySelectorAll(".faq-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const answer = btn.nextElementSibling;
            const chevron = btn.querySelector(".faq-chevron");
            const isOpen = !answer.classList.contains("hidden");

            document.querySelectorAll(".faq-answer").forEach(a => a.classList.add("hidden"));
            document.querySelectorAll(".faq-chevron").forEach(c => c.classList.remove("rotate-180"));

            if (!isOpen) {
              answer.classList.remove("hidden");
              chevron.classList.add("rotate-180");
            }
          });
        });
      }

      // Contact & Footer Values
      setText("contact-phone-val", C.contact.phoneDisplay);
      setAttr("contact-phone-val", "href", `tel:${C.contact.phoneHref}`);
      setText("contact-wa-val", C.contact.whatsappDisplay);
      setAttr("contact-wa-val", "href", `https://wa.me/${C.contact.whatsappNumber}`);
      setText("contact-addr-val", `${C.location.addressLine1}, ${C.location.city} – ${C.location.pincode}`);

      setText("footer-brand", C.brand.name.toUpperCase());
      setText("footer-address", `${C.location.addressLine1}, ${C.location.city}, ${C.location.state} – ${C.location.pincode}`);
      setAttr("footer-wa-link", "href", `https://wa.me/${C.contact.whatsappNumber}`);
      setAttr("footer-map-link", "href", C.location.googleMapsDirectionsUrl);
      setAttr("floating-whatsapp", "href", `https://wa.me/${C.contact.whatsappNumber}?text=${encodeURIComponent(C.contact.whatsappDefaultMessage)}`);

      setAttr("bar-call", "href", `tel:${C.contact.phoneHref}`);
      setAttr("bar-wa", "href", `https://wa.me/${C.contact.whatsappNumber}`);

      // Consultation Form Handler
      const form = document.getElementById("consultation-form");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const name = document.getElementById("form-name").value.trim();
          const phone = document.getElementById("form-phone").value.trim();
          const service = document.getElementById("form-service").value;
          const area = document.getElementById("form-area").value.trim() || "Not specified";
          const notes = document.getElementById("form-notes").value.trim() || "None";

          const msg = `*New Customer Inquiry - Krishna Sales Champa*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Requirement:* ${service}\n*Approx Area / Qty:* ${area}\n*Notes:* ${notes}\n\nSent from website consultation form.`;
          const url = `https://wa.me/${C.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
          window.open(url, "_blank");
        });
      }

      // Mobile Menu Toggle
      const mobileToggle = document.getElementById("mobile-menu-toggle");
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener("click", () => {
          mobileMenu.classList.toggle("hidden");
        });
        document.querySelectorAll(".mobile-nav-link").forEach(link => {
          link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
          });
        });
      }

      refreshIcons();
    });
  