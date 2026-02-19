import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: '#E62F2D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#FFFCF5',
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          g
        </span>
      </div>
    ),
    { ...size }
  );
}
