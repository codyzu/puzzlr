export default function MissingPiece({className}: {className?: string}) {
  return (
    <div className={className ?? 'text-sm items-center text-center'}>
      <div>Are you the missing piece?</div>
      <div className="inline-block">
        Let us know at{' '}
        <a className="font-bold" href="https://www.nearform.com/careers/">
          NearForm Careers
        </a>
        .
      </div>
    </div>
  );
}
