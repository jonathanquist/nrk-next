export const shareOnFacebook = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`
  );
};

export const shareOnTwitter = (title: any) => {
  const tweetText = encodeURIComponent(`Nybro Ridklubb: "${title}"`);
  window.open(
    `https://twitter.com/intent/tweet?text=${tweetText}&url=${window.location.href}`
  );
};
