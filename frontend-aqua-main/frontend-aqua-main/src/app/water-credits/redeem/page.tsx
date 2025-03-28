'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function RedeemPage() {
  const router = useRouter();
  const currentUserId = 'user123'; // Replace dynamically later
  const [vouchers, setVouchers] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/vouchers/${currentUserId}`)
      .then(res => res.json())
      .then(data => setVouchers(data.vouchers));
  }, [currentUserId]);

  const redeemVoucher = (voucherPath: string) => {
    router.push(`/water-credits/redeem/success?image=${encodeURIComponent(voucherPath)}`);
  };

  return (
    <div className="min-h-screen bg-[url('/water-texture.png')] bg-cover bg-fixed py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Your Available Vouchers</h1>
        {vouchers.length === 0 ? (
          <p className="text-white">No vouchers available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vouchers.map((voucher, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-white bg-opacity-90 shadow-lg rounded-xl overflow-hidden">
                  <CardContent className="p-4 flex flex-col items-center">
                    <img
                      src={voucher}
                      alt="Voucher"
                      className="object-contain w-full h-48 mb-4"
                    />
                    <Button 
                         onClick={() => redeemVoucher(voucher)} 
                         className="bg-white text-gray-800 hover:bg-gray-100"
                        >
                         Redeem Now
                    </Button>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
