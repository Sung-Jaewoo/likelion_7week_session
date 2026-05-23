import axios from 'axios'
import { useEffect, useState } from 'react'

const API_URL = '/air-api/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty'
const STATION_NAME = '종로구'

const gradeText = {
  1: '좋음',
  2: '보통',
  3: '나쁨',
  4: '매우 나쁨',
}

function App() {
  const [airData, setAirData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAirData = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            serviceKey: import.meta.env.VITE_PUBLIC_DATA_API_KEY,
            returnType: 'json',
            numOfRows: 1,
            pageNo: 1,
            stationName: STATION_NAME,
            dataTerm: 'DAILY',
            ver: '1.3',
          },
        })

        console.log(response.data)

        const item = response.data?.response?.body?.items?.[0]

        if (!item) {
          throw new Error('측정소 데이터를 찾을 수 없습니다.')
        }

        setAirData(item)
      } catch (err) {
        setError(err.message || '데이터를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchAirData()
  }, [])

  const currentGrade = airData?.khaiGrade
    ? gradeText[airData.khaiGrade]
    : '확인 중'

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <header className="rounded-lg border border-cyan-300/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/30">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
            Public Data Portal
          </p>
          <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">
            종로구 실시간 대기질 조회
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            공공데이터포털 에어코리아 API를 axios, useEffect, .env로 연동해
            실시간 미세먼지 데이터를 화면에 출력합니다.
          </p>
        </header>

        {loading && (
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 text-slate-300">
            데이터를 불러오는 중입니다.
          </div>
        )}

        {error && !loading && (
          <div className="rounded-lg border border-rose-400/40 bg-rose-950/50 p-6">
            <p className="text-lg font-bold text-rose-100">API 호출을 확인해주세요.</p>
            <p className="mt-2 text-sm text-rose-200">{error}</p>
            <p className="mt-4 text-sm leading-6 text-rose-100">
              `.env` 파일의 `VITE_PUBLIC_DATA_API_KEY`에 공공데이터포털 서비스 키를
              넣고 개발 서버를 다시 실행하면 실제 데이터가 표시됩니다.
            </p>
          </div>
        )}

        {airData && !loading && (
          <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <article className="rounded-lg border border-cyan-300/20 bg-slate-900 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-300">
                    {airData.stationName} 측정소
                  </p>
                  <h2 className="mt-2 text-5xl font-black text-white">{currentGrade}</h2>
                </div>
                <p className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950">
                  {airData.dataTime}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <MetricCard title="통합대기지수" value={airData.khaiValue} unit="CAI" />
                <MetricCard title="미세먼지" value={airData.pm10Value} unit="㎍/㎥" />
                <MetricCard title="초미세먼지" value={airData.pm25Value} unit="㎍/㎥" />
                <MetricCard title="오존" value={airData.o3Value} unit="ppm" />
              </div>
            </article>

            <aside className="rounded-lg border border-slate-700 bg-slate-900/80 p-6">
              <h2 className="text-xl font-bold text-white">연동 정보</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <InfoRow title="API" content="한국환경공단 에어코리아 대기오염정보" />
                <InfoRow title="요청 방식" content="axios GET 요청" />
                <InfoRow title="React Hook" content="useEffect, useState 사용" />
                <InfoRow title="API 키" content=".env 파일에서 관리" />
              </dl>
            </aside>
          </section>
        )}
      </section>
    </main>
  )
}

function MetricCard({ title, value, unit }) {
  return (
    <div className="rounded-lg bg-slate-800 p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-black text-white">{value || '-'}</p>
      <p className="text-xs font-bold text-cyan-300">{unit}</p>
    </div>
  )
}

function InfoRow({ title, content }) {
  return (
    <div className="border-b border-slate-700 pb-4 last:border-0 last:pb-0">
      <dt className="font-bold text-cyan-300">{title}</dt>
      <dd className="mt-1 text-slate-300">{content}</dd>
    </div>
  )
}

export default App
