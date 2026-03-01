import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assumes you have a prisma client exported from here

export async function GET(request: Request) {
    // Optionally secure your cron job to only allow requests from Vercel
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        console.log("Pinging database to keep Supabase active...");
        
        // Execute a fast, lightweight query to wake up/keep the database active
        // using the Prisma client
        await prisma.visitor.count();

        // Log the successful cron run
        await prisma.cronLog.create({
            data: {
                jobName: 'keep-alive',
                status: 'SUCCESS',
            }
        });

        console.log("Database pinged successfully.");
        return NextResponse.json({ success: true, message: 'Database is active and pinged successfully' });
    } catch (error: any) {
        console.error('Database ping failed:', error.message);
        
        // Log the failed cron run
        await prisma.cronLog.create({
            data: {
                jobName: 'keep-alive',
                status: 'ERROR',
                message: error.message || 'Unknown error',
            }
        }).catch((logError: any) => console.error('Failed to save cron error log:', logError));

        return NextResponse.json({ success: false, error: 'Failed to ping database' }, { status: 500 });
    }
}
