'use client';

import { useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Detail() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <>
      <div className="container flex h-screen w-full mt-10 ml-5">
        <div className="w-full flex gap-2 flex-col">
          <p className="text-2xl">TOP</p>
          <p className="text-sm mb-10">申請中の猫情報を確認しましょう</p>
          <p className="text-sm">申請状況</p>
          <p className="text-xs mb-5">申請中の猫情報のステータスが確認できます</p>

          <Table>
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead className="w-32">申請種別</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>申請日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-gray-100">
              <TableRow>
                <TableCell className="font-medium">
                  <Badge className="bg-slate-200" variant="secondary" >猫登録</Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-yellow-300" variant="secondary">申請中</Badge>
                </TableCell>
                <TableCell>2024年11月11日</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Badge className="bg-slate-200" variant="secondary" >猫登録</Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-red-300" variant="secondary">要修正</Badge>
                </TableCell>
                <TableCell>2024年11月22日</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}