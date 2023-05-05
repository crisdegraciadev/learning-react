const FACT_API_BASE_URL = 'https://catfact.ninja/fact'

export const getRandomFact = async () => {
  const res = await fetch(FACT_API_BASE_URL)
  const data = await res.json()
  return data.fact
}
