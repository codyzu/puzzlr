export default function ErrorPage() {
  return (
    <div className="w-full h-[100dvh] justify-center p-4">
      <div className="i-tabler-mood-sad-dizzy w-20 h-20" />
      <div className="inline-block text-center">
        Oops. Something went wrong. Try refreshing or going{' '}
        <a className="underline" href="/">
          home
        </a>
        .
      </div>
    </div>
  );
}
