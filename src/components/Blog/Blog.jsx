import { BLOG_POSTS } from '../../data/portfolioData';
import styles from './Blog.module.css';

export default function Blog() {
  return (
    <section id="blog" className={styles.blogSection}>
      <div className="container">
        <div>
          <div className="section-tag">writing</div>
          <h2 className="section-title">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="section-sub">
            Thoughts on building, open source, and the craft of software.
          </p>
        </div>

        <div className={styles.blogGrid}>
          {BLOG_POSTS.map((post, i) => (
            <div key={i} className={styles.blogCard}>
              <div className={styles.blogImg}>
                <span className={styles.blogTagText}>{post.tag}</span>
              </div>
              <div className={styles.blogContent}>
                <div className={styles.blogMeta}>
                  <span className={styles.blogCat}>{post.cat}</span>
                  <span className={styles.blogDate}>{post.date}</span>
                </div>
                <h3 className={styles.blogTitle}>{post.title}</h3>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                <div className={styles.blogRead}>Read more →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
