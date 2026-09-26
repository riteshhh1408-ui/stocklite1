'use client'

import { useEffect, useState } from 'react'
import DashboardShell from '@/components/DashboardShell'
import TransactionTable from '@/components/TransactionTable'
import { Transaction } from '@/lib/types'

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await fetch('/api/transactions', {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error('Failed to load transactions')
        }

        const data = await response.json()
        setTransactions(data.transactions)
      } catch (error) {
        console.error('Failed to load transaction history:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [])

  return (
    <DashboardShell>
      <div className="page-header">
        <div>
          <h1>Transaction History</h1>
          <p>A record of every stock movement across warehouses.</p>
        </div>
      </div>

      {loading ? (
        <div className="panel">
          <p>Loading transaction history...</p>
        </div>
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </DashboardShell>
  )
}