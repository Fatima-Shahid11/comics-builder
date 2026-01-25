'use client';

import { useState } from 'react';
import { FaBookOpen, FaMagic, FaTruckLoading } from 'react-icons/fa';
import styles from './home.module.css';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [pages, setPages] = useState(3);
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateComic = async () => {
    if (!prompt.trim()) {
      setError('Please enter a story prompt');
      return;
    }

    setLoading(true);
    setError('');
    setComic(null);

    try {
      const response = await fetch('/api/generate-comic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, pages }),
      });

      const data = await response.json();

      if (data.success) {
        setComic(data.comic);
      } else {
        setError(data.error || 'Failed to generate comic');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <FaBookOpen size={48} color="#2d2d2fff" />
            Comic Builder
          </div>
          <p className={styles.headerSubtitle}>
            Create amazing comic stories using Llama AI
          </p>
        </div>

        {/* Input Section */}
        <div className={styles.inputSection}>
          <div>
            <label className={styles.label}>Story Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A brave knight discovers a magical forest where animals can talk..."
              className={styles.textarea}
              rows="4"
            />
          </div>
          <div>
            <label className={styles.label}>Number of Pages (1-5)</label>
            <div className={styles.rangeWrapper}>
              <input
                type="range"
                min="1"
                max="5"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className={styles.rangeInput}
              />
              <span className={styles.rangeValue}>{pages}</span>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            onClick={generateComic}
            disabled={loading}
            className={styles.button}
          >
            {loading ? (
              <>
                <FaTruckLoading className="animate-spin" />
                Generating Comic...
              </>
            ) : (
              <>
                <FaMagic />
                Generate Comic
              </>
            )}
          </button>
        </div>

        {/* Comic Display */}
        {comic && (
          <div className={styles.comicDisplay}>
            <h2 className={styles.comicTitle}>{comic.title}</h2>
            <p className={styles.comicPages}>
              {comic.pages?.length || 0} pages
            </p>

            {comic.pages?.map((page) => (
              <div key={page.page} className={styles.pageCard}>
                <div className={styles.pageHeader}>
                  <span className={styles.pageNumber}>Page {page.page}</span>
                </div>

                <p className={styles.sceneDescription}>{page.scene}</p>

                <div className={styles.panelsGrid}>
                  {page.panels?.map((panel) => (
                    <div key={panel.panel} className={styles.panelCard}>
                      <div className={styles.panelNumber}>
                        Panel {panel.panel}
                      </div>
                      <p className={styles.panelDescription}>
                        {panel.description}
                      </p>
                      {panel.dialogue && (
                        <div className={styles.dialogue}>
                          <span className={styles.dialogueLabel}>Dialogue</span>
                          <p className={styles.dialogueText}>
                            "{panel.dialogue}"
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
