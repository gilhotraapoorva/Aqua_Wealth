import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const voucherDir = path.join(process.cwd(), 'public', 'vouchers', userId);

  try {
    const files = await fs.readdir(voucherDir);
    const imagePaths = files
      .filter((file) => /\.(png|jpg|jpeg|webp|svg)$/.test(file))
      .map((file) => `/vouchers/${userId}/${file}`);

    return NextResponse.json({ vouchers: imagePaths });
  } catch (err) {
    return NextResponse.json({ vouchers: [] });
  }
}
