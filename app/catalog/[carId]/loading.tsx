import css from "./loading.module.css";

export default function CarLoading() {
  return (
    <main className={css.page} aria-busy="true">
      <p className={css.visuallyHidden} role="status">
        Loading car details...
      </p>

      <div className={css.layout} aria-hidden="true">
        <div className={css.leftColumn}>
          <div className={`${css.skeleton} ${css.image}`} />

          <div className={css.form}>
            <div className={`${css.skeleton} ${css.subtitle}`} />
            <div className={`${css.skeleton} ${css.line}`} />

            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className={`${css.skeleton} ${css.input}`} />
            ))}

            <div className={`${css.skeleton} ${css.comment}`} />
            <div className={`${css.skeleton} ${css.button}`} />
          </div>
        </div>

        <div className={css.content}>
          <div className={`${css.skeleton} ${css.title}`} />
          <div className={`${css.skeleton} ${css.line}`} />
          <div className={`${css.skeleton} ${css.price}`} />

          <div className={css.description}>
            <div className={`${css.skeleton} ${css.line}`} />
            <div className={`${css.skeleton} ${css.line}`} />
            <div className={`${css.skeleton} ${css.shortLine}`} />
          </div>

          {Array.from({ length: 3 }, (_, sectionIndex) => (
            <div key={sectionIndex} className={css.section}>
              <div className={`${css.skeleton} ${css.subtitle}`} />

              {Array.from({ length: 3 }, (_, lineIndex) => (
                <div
                  key={lineIndex}
                  className={`${css.skeleton} ${css.line}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
