/**
 * Margin sprinkles from the brandbook (spark, cross, dot). Max seven per view, never behind content.
 * Kept under the old name so existing layouts don't need to change.
 */
export function FloatingOrbs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden lg:block"
      aria-hidden="true"
    >
      <svg className="absolute left-[4%] top-[18%]" width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0v14M0 7h14" stroke="#FF8FAB" strokeWidth="1.5" />
      </svg>
      <svg className="absolute right-[6%] top-[12%]" width="18" height="18" viewBox="0 0 18 18">
        <path
          d="M9 0c.6 4.6 3.4 7.4 9 9-5.6 1.6-8.4 4.4-9 9-.6-4.6-3.4-7.4-9-9 5.6-1.6 8.4-4.4 9-9z"
          fill="#FF2E52"
        />
      </svg>
      <span className="absolute bottom-[22%] left-[7%] h-[7px] w-[7px] rounded-full bg-brand-primary" />
      <span className="absolute bottom-[30%] right-[5%] h-[5px] w-[5px] rounded-full bg-brand-petal" />
      <svg className="absolute bottom-[10%] right-[12%]" width="12" height="12" viewBox="0 0 12 12">
        <path d="M6 0v12M0 6h12" stroke="#FFC2D3" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
