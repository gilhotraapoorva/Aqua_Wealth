'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuccessPage() {
  const params = useSearchParams();
  const image = params.get('image');

  return (
    <div className="min-h-screen bg-[url('/water-texture.png')] bg-cover bg-fixed py-8 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl text-center"
      >
        <CheckCircle2 className="mx-auto text-green-500" size={60} />
        <h2 className="text-2xl font-bold mt-4 text-gray-800">Voucher Redeemed Successfully!</h2>
        {image && (
          <img
            src={image}
            alt="Redeemed Voucher"
            className="mx-auto my-4 rounded-lg shadow-md max-w-xs"
          />
        )}
        <p className="text-gray-600 mt-4">You have successfully redeemed your voucher.</p>
        <Button className="mt-6" asChild>
          <Link href="/water-credits/redeem">Back to Redeem Page</Link>
        </Button>
      </motion.div>
    </div>
  );
}
