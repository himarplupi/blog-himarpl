
export const getData = async (url: string, duration = 60) => {
  const res = await fetch(url, {
    cache: 'force-cache',
    next: {
      revalidate: duration,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}