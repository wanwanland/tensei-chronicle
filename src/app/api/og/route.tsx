import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getSimulationById } from "@/lib/simulation";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  // Default OGP for top page / invalid id
  if (!id) {
    return new ImageResponse(
      <DefaultOgImage />,
      { width: 1200, height: 630 }
    );
  }

  const result = await getSimulationById(id);

  if (!result) {
    return new ImageResponse(
      <DefaultOgImage />,
      { width: 1200, height: 630 }
    );
  }

  const genderLabel = result.input.gender === "male" ? "男性" : "女性";
  const { birth_year, region } = result.input;

  // Pick key milestones
  const milestones = result.timeline
    .filter((e) => e.life_events.length > 0)
    .slice(0, 6)
    .map((e) => ({ age: e.age, event: e.life_events[0], year: e.year }));

  // Pick top social events
  const topEvents = result.timeline
    .flatMap((e) => e.social_events.map((s) => ({ year: e.year, title: s.title })))
    .slice(0, 3);

  const firstEra = result.timeline[0]?.era_name ?? "";
  const lastEntry = result.timeline[result.timeline.length - 1];
  const lifespan = lastEntry ? lastEntry.age : 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#000000",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,243,255,0.06) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(0,243,255,0.06) 0px, transparent 1px, transparent 40px)",
            display: "flex",
          }}
        />

        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(0,243,255,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Bottom magenta glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "150px",
            background: "radial-gradient(ellipse at 50% 100%, rgba(255,0,255,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "48px 60px",
            position: "relative",
                        height: "100%",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "42px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.1em" }}>
              転生年表
            </span>
            <span style={{ fontSize: "16px", color: "rgba(0,243,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>
              TENSEI CHRONICLE
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, rgba(0,243,255,0.6), rgba(255,0,255,0.4), transparent)",
              marginTop: "16px",
              marginBottom: "24px",
              display: "flex",
            }}
          />

          {/* Profile section */}
          <div style={{ display: "flex", gap: "32px", alignItems: "center", marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 20px",
                border: "1px solid rgba(0,243,255,0.4)",
                borderRadius: "6px",
                background: "rgba(0,243,255,0.05)",
              }}
            >
              <span style={{ fontSize: "28px", color: "#00f3ff", fontWeight: 700 }}>
                {birth_year}年生まれ
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 20px",
                border: "1px solid rgba(255,0,255,0.4)",
                borderRadius: "6px",
                background: "rgba(255,0,255,0.05)",
              }}
            >
              <span style={{ fontSize: "28px", color: "#ff00ff", fontWeight: 700 }}>
                {genderLabel}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 20px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <span style={{ fontSize: "28px", color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>
                {region}
              </span>
            </div>
            <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>
              {firstEra} ～ {lifespan}年間の人生
            </span>
          </div>

          {/* Main content: milestones + events */}
          <div style={{ display: "flex", gap: "40px", flex: 1 }}>
            {/* Life milestones */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <span style={{ fontSize: "12px", color: "rgba(0,243,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "12px" }}>
                LIFE MILESTONES
              </span>
              {milestones.map((m) => (
                <div
                  key={m.age}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid rgba(0,243,255,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      color: "#00f3ff",
                      flexShrink: 0,
                    }}
                  >
                    {m.age}
                  </div>
                  <span style={{ fontSize: "20px", color: "#ff00ff", fontWeight: 600 }}>
                    {m.event}
                  </span>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.25)", marginLeft: "auto" }}>
                    {m.year}
                  </span>
                </div>
              ))}
            </div>

            {/* Social events */}
            {topEvents.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", width: "360px" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,0,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "12px" }}>
                  SOCIAL EVENTS
                </span>
                {topEvents.map((e, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                      padding: "6px 12px",
                      borderLeft: "2px solid rgba(255,0,255,0.3)",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
                      {e.year}
                    </span>
                    <span style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)" }}>
                      {e.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>
              あなたも別の時代に転生してみませんか？
            </span>
            <span style={{ fontSize: "13px", color: "rgba(0,243,255,0.3)", letterSpacing: "0.1em" }}>
              tensei-chronicle.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

function DefaultOgImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        fontFamily: "monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,243,255,0.06) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(0,243,255,0.06) 0px, transparent 1px, transparent 40px)",
          display: "flex",
        }}
      />
      {/* Top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "300px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(0,243,255,0.15) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      <span style={{ fontSize: "72px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.15em",  }}>
        転生年表
      </span>
      <span style={{ fontSize: "20px", color: "rgba(0,243,255,0.6)", letterSpacing: "0.3em", marginTop: "16px", zIndex: 1, textTransform: "uppercase" as const }}>
        TENSEI CHRONICLE
      </span>
      <div
        style={{
          width: "400px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(0,243,255,0.6), rgba(255,0,255,0.4), transparent)",
          marginTop: "24px",
          marginBottom: "24px",
          display: "flex",
                  }}
      />
      <span style={{ fontSize: "22px", color: "rgba(255,255,255,0.5)", zIndex: 1, textAlign: "center" as const }}>
        もしも別の時代に生まれていたら——
      </span>
      <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.3)", marginTop: "8px",  }}>
        あなたのIFの人生をシミュレーション
      </span>
    </div>
  );
}
