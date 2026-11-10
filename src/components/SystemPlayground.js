import React, { useState, useEffect } from 'react';
import {
  FaPlay,
  FaUndo,
  FaMicrochip,
  FaExclamationTriangle,
  FaLayerGroup,
  FaBolt,
} from 'react-icons/fa';
import { SiApachekafka, SiMongodb, SiRedis, SiGo } from 'react-icons/si';

const SystemPlayground = () => {
  const [activeTab, setActiveTab] = useState('ratelimiter');

  // --- GOPULSE RATE LIMITER SIMULATION STATE ---
  const [bucketCapacity, setBucketCapacity] = useState(10);
  const [refillRate, setRefillRate] = useState(2); // tokens per second
  const [currentTokens, setCurrentTokens] = useState(10);
  const [rateLimiterLogs, setRateLimiterLogs] = useState([
    {
      id: 'REQ-INIT',
      time: 'Ready',
      client: '192.168.1.105',
      status: 200,
      latency: '1.8ms',
      tokensLeft: 10,
      msg: 'Go Token Bucket Engine initialized. Redis cluster connected.',
    },
  ]);

  // Periodic refill simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTokens((prev) => Math.min(bucketCapacity, prev + refillRate));
    }, 1000);
    return () => clearInterval(timer);
  }, [bucketCapacity, refillRate]);

  const sendRequests = (count) => {
    const newLogs = [];
    let tokens = currentTokens;

    for (let i = 0; i < count; i++) {
      const isAllowed = tokens >= 1;
      const latency = (Math.random() * 2 + 1.2).toFixed(1);
      if (isAllowed) {
        tokens -= 1;
        newLogs.push({
          id: `REQ-${Math.floor(Math.random() * 89999 + 10000)}`,
          time: new Date().toLocaleTimeString(),
          client: `192.168.1.${Math.floor(Math.random() * 50 + 100)}`,
          status: 200,
          latency: `${latency}ms`,
          tokensLeft: tokens,
          msg: 'Token consumed. Request forwarded to Gin handler.',
        });
      } else {
        newLogs.push({
          id: `REQ-${Math.floor(Math.random() * 89999 + 10000)}`,
          time: new Date().toLocaleTimeString(),
          client: `192.168.1.${Math.floor(Math.random() * 50 + 100)}`,
          status: 429,
          latency: '0.6ms',
          tokensLeft: 0,
          msg: 'Rate limit exceeded. Request throttled (HTTP 429).',
        });
      }
    }

    setCurrentTokens(tokens);
    setRateLimiterLogs((prev) => [...newLogs, ...prev.slice(0, 8)]);
  };

  const resetRateLimiter = () => {
    setCurrentTokens(bucketCapacity);
    setRateLimiterLogs([
      {
        id: 'REQ-RESET',
        time: new Date().toLocaleTimeString(),
        client: 'SYSTEM',
        status: 200,
        latency: '0.5ms',
        tokensLeft: bucketCapacity,
        msg: 'Bucket refilled to maximum capacity.',
      },
    ]);
  };

  // --- KAFKA TELEMETRY SIMULATION STATE ---
  const [packetType, setPacketType] = useState('gps');
  const [telemetryLogs, setTelemetryLogs] = useState([
    {
      id: 'PKT-INIT',
      time: 'Ready',
      type: 'STATUS',
      latency: '0ms',
      destination: 'Cluster Idle',
      payload: { status: 'Kafka Ingestion Listener Ready' },
    },
  ]);

  const emitTelemetryPacket = () => {
    const isCorrupt = packetType === 'corrupt';
    const latency = Math.floor(Math.random() * 35 + 18); // 18ms - 53ms (<100ms)
    const newPacket = {
      id: `PKT-${Math.floor(Math.random() * 89999 + 10000)}`,
      time: new Date().toLocaleTimeString(),
      type: packetType.toUpperCase(),
      latency: `${latency}ms`,
      destination: isCorrupt ? 'DEAD-LETTER-QUEUE (DLQ)' : 'MONGODB (TIME-SERIES)',
      isDlq: isCorrupt,
      payload:
        packetType === 'gps'
          ? {
              deviceId: 'DEV-NODE-8841',
              latitude: 12.9716,
              longitude: 77.5946,
              speedKph: 68.4,
              heading: 184,
            }
          : packetType === 'canbus'
          ? {
              deviceId: 'DEV-NODE-9102',
              rpm: 2450,
              coolantTempC: 89,
              fuelLevelPct: 74.2,
              odometerKm: 45120,
            }
          : packetType === 'battery'
          ? {
              deviceId: 'DEV-NODE-3304',
              voltage: 11.2,
              status: 'CRITICAL_DISCHARGE_WARNING',
              auxSystem: 'FAILSAFE_TRIGGERED',
            }
          : {
              rawBytes: '0xFF_0x00_CORRUPT_CRC_CHECKSUM_ERROR',
              reason: 'ValidationFailedException: Unparseable payload structure',
            },
    };

    setTelemetryLogs((prev) => [newPacket, ...prev.slice(0, 4)]);
  };

  // --- SETTLESENSE LEDGER SIMULATION STATE ---
  const [expenseAmount, setExpenseAmount] = useState(120);
  const [payer, setPayer] = useState('Mriganka');
  const [splitMode, setSplitMode] = useState('equal');
  const [ledgerEntries, setLedgerEntries] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const calculateLedger = () => {
    setIsReversed(false);
    const members = ['Mriganka', 'Alex', 'Jordan', 'Sam'];
    const amountInCents = Math.round(Number(expenseAmount) * 100);

    let distributions = [];
    if (splitMode === 'equal') {
      const shareInCents = Math.floor(amountInCents / members.length);
      const remainder = amountInCents % members.length;

      distributions = members.map((m, idx) => ({
        user: m,
        shareCents: shareInCents + (idx < remainder ? 1 : 0),
      }));
    } else if (splitMode === 'percent') {
      const weights = [0.4, 0.3, 0.2, 0.1];
      distributions = members.map((m, idx) => ({
        user: m,
        shareCents: Math.round(amountInCents * weights[idx]),
      }));
    } else {
      distributions = [
        { user: 'Mriganka', shareCents: Math.round(amountInCents * 0.5) },
        { user: 'Alex', shareCents: Math.round(amountInCents * 0.25) },
        { user: 'Jordan', shareCents: Math.round(amountInCents * 0.15) },
        { user: 'Sam', shareCents: Math.round(amountInCents * 0.1) },
      ];
    }

    const entries = distributions.map((d, index) => {
      const isPayer = d.user === payer;
      const netCents = isPayer ? amountInCents - d.shareCents : -d.shareCents;

      return {
        id: `TX-${index + 101}`,
        user: d.user,
        share: (d.shareCents / 100).toFixed(2),
        net: (netCents / 100).toFixed(2),
        type: isPayer ? 'CREDIT' : 'DEBIT',
        status: 'COMMITTED',
      };
    });

    setLedgerEntries(entries);
  };

  const simulateReversal = () => {
    if (!ledgerEntries) return;
    setIsReversed(true);
  };

  return (
    <section id="playground" name="playground" className="w-full py-20 bg-[#090d16] text-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <FaMicrochip /> Interactive Architecture Lab
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Live System Simulations
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Test and interact with open algorithmic simulations representing key architectural domains: Go distributed rate limiting, Kafka event streaming, and DDD financial ledgers.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('ratelimiter')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'ratelimiter'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <SiGo className={activeTab === 'ratelimiter' ? 'text-slate-950' : 'text-cyan-400'} />
            Go Distributed Rate Limiter
          </button>
          <button
            onClick={() => setActiveTab('kafka')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'kafka'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <SiApachekafka className={activeTab === 'kafka' ? 'text-slate-950' : 'text-cyan-400'} />
            Kafka Real-Time Telemetry Pipeline
          </button>
          <button
            onClick={() => setActiveTab('settlesense')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'settlesense'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <FaLayerGroup className={activeTab === 'settlesense' ? 'text-slate-950' : 'text-purple-400'} />
            SettleSense Immutable Ledger Engine
          </button>
        </div>

        {/* --- SIMULATION 1: GOPULSE DISTRIBUTED RATE LIMITER --- */}
        {activeTab === 'ratelimiter' && (
          <div className="bg-[#0c1220] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Controls Column */}
              <div className="space-y-5 lg:border-r lg:border-slate-800 lg:pr-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FaBolt className="text-yellow-400" /> Token Bucket Controls
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                    Go + Redis
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    BUCKET CAPACITY (BURST): <span className="text-cyan-300">{bucketCapacity} Tokens</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[5, 10, 20].map((cap) => (
                      <button
                        key={cap}
                        onClick={() => {
                          setBucketCapacity(cap);
                          setCurrentTokens(cap);
                        }}
                        className={`py-1.5 text-xs font-mono rounded border transition-colors ${
                          bucketCapacity === cap
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {cap} Max
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    TOKEN REFILL RATE: <span className="text-emerald-400">+{refillRate} tokens/sec</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setRefillRate(rate)}
                        className={`py-1.5 text-xs font-mono rounded border transition-colors ${
                          refillRate === rate
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        +{rate}/sec
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-slate-400 mb-1">DISPATCH CONCURRENT TRAFFIC:</div>
                  <button
                    onClick={() => sendRequests(1)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition-colors flex items-center justify-between"
                  >
                    <span>Send Single Request</span>
                    <span className="text-cyan-400 font-semibold">1 req</span>
                  </button>

                  <button
                    onClick={() => sendRequests(5)}
                    className="w-full py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-xs font-mono text-cyan-300 transition-colors flex items-center justify-between"
                  >
                    <span>Send Burst Batch</span>
                    <span className="font-semibold">5 concurrent reqs</span>
                  </button>

                  <button
                    onClick={() => sendRequests(12)}
                    className="w-full py-2 px-3 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-xs font-mono text-rose-300 transition-colors flex items-center justify-between"
                  >
                    <span>Trigger Traffic Spike (Flood)</span>
                    <span className="font-semibold">12 reqs (Test 429)</span>
                  </button>
                </div>

                <button
                  onClick={resetRateLimiter}
                  className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                >
                  <FaUndo size={11} /> Reset Bucket State
                </button>
              </div>

              {/* Bucket State & Output Column */}
              <div className="lg:col-span-2 space-y-5">
                {/* Visual Token Meter */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-2">
                      <SiRedis className="text-rose-400" /> Redis Token Bucket State:
                    </span>
                    <span className="font-bold text-white">
                      {currentTokens} / {bucketCapacity} Tokens Available
                    </span>
                  </div>

                  {/* Meter Bar */}
                  <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        currentTokens === 0
                          ? 'bg-rose-500'
                          : currentTokens <= 3
                          ? 'bg-amber-500'
                          : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                      }`}
                      style={{ width: `${(currentTokens / bucketCapacity) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Throttling Status: {currentTokens === 0 ? '⛔ 429 TOO MANY REQUESTS' : '✅ 200 OK ACCEPTING'}</span>
                    <span>Refill: Auto +{refillRate}/s</span>
                  </div>
                </div>

                {/* Request Stream Logs */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                      Go Gin Gateway • Sub-5ms Redis Decision Stream
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Atomic Lua Script Evaluation</span>
                  </div>

                  <div className="bg-[#080c14] border border-slate-800 rounded-xl overflow-hidden font-mono text-xs max-h-56 overflow-y-auto">
                    <div className="grid grid-cols-5 bg-slate-900 px-3 py-2 text-slate-400 border-b border-slate-800 text-[11px]">
                      <div>REQ ID</div>
                      <div>CLIENT IP</div>
                      <div>STATUS</div>
                      <div>LATENCY</div>
                      <div>TOKENS REMAINING</div>
                    </div>
                    <div className="divide-y divide-slate-800/60">
                      {rateLimiterLogs.map((log) => (
                        <div key={log.id} className="grid grid-cols-5 px-3 py-2.5 items-center text-slate-300">
                          <span className="text-slate-400">{log.id}</span>
                          <span className="truncate">{log.client}</span>
                          <span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                log.status === 200
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-rose-500/20 text-rose-400'
                              }`}
                            >
                              {log.status} {log.status === 200 ? 'OK' : '429'}
                            </span>
                          </span>
                          <span className="text-cyan-400">{log.latency}</span>
                          <span className="text-slate-400">{log.tokensLeft} tokens</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SIMULATION 2: KAFKA TELEMETRY PIPELINE --- */}
        {activeTab === 'kafka' && (
          <div className="bg-[#0c1220] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Controls Column */}
              <div className="space-y-5 lg:border-r lg:border-slate-800 lg:pr-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <SiApachekafka className="text-cyan-400" /> IoT Packet Emitter
                </h3>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    SELECT TELEMETRY PACKET:
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'gps', label: 'GPS Coordinate Broadcast (Standard)' },
                      { id: 'canbus', label: 'Engine CAN Bus Diagnostics' },
                      { id: 'battery', label: 'Critical Battery Failsafe Alert' },
                      { id: 'corrupt', label: 'Corrupt Checksum Packet (Trigger DLQ)' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPacketType(p.id)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all ${
                          packetType === p.id
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-medium'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl space-y-1">
                  <div className="text-[11px] font-mono text-slate-400">Target Kafka Topic:</div>
                  <div className="text-xs font-mono text-emerald-400 font-semibold">iot.telemetry.production.v1</div>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">Partition Hash:</div>
                  <div className="text-xs font-mono text-cyan-400">CRC32(deviceId) % 16</div>
                </div>

                <button
                  onClick={emitTelemetryPacket}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-md"
                >
                  <FaPlay size={12} /> Emit IoT Telemetry Packet
                </button>
              </div>

              {/* Ingestion Pipeline Visualization */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                    Active Architecture Flow
                  </h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <div className="text-slate-400 text-[10px]">SOURCE</div>
                      <div className="text-cyan-400 font-semibold mt-1">IoT Node</div>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <div className="text-slate-400 text-[10px]">INGESTION</div>
                      <div className="text-yellow-400 font-semibold mt-1">Spring Gateway</div>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <div className="text-slate-400 text-[10px]">BROKER</div>
                      <div className="text-cyan-400 font-semibold mt-1">Kafka Cluster</div>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <div className="text-slate-400 text-[10px]">STORAGE / DLQ</div>
                      <div className="text-emerald-400 font-semibold mt-1">MongoDB / DLQ</div>
                    </div>
                  </div>
                </div>

                {/* Packet Ingestion Stream */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400">Live Ingested Packets (Sub-100ms Latency)</span>
                    <span className="text-xs font-mono text-emerald-400">Latency: &lt; 100ms Guaranteed</span>
                  </div>
                  <div className="space-y-2">
                    {telemetryLogs.map((pkt) => (
                      <div
                        key={pkt.id}
                        className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                          pkt.isDlq
                            ? 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                            : 'bg-[#080c14] border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-1.5 mb-2">
                          <span className="font-semibold text-white flex items-center gap-1.5">
                            {pkt.isDlq ? (
                              <FaExclamationTriangle className="text-rose-400" />
                            ) : (
                              <SiMongodb className="text-emerald-400" />
                            )}
                            {pkt.id} • {pkt.type}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500">{pkt.time}</span>
                            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                              {pkt.latency}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                pkt.isDlq ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                              }`}
                            >
                              {pkt.destination}
                            </span>
                          </div>
                        </div>
                        <pre className="text-[11px] text-slate-400 overflow-x-auto">
                          {JSON.stringify(pkt.payload, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- SIMULATION 3: SETTLESENSE LEDGER ENGINE --- */}
        {activeTab === 'settlesense' && (
          <div className="bg-[#0c1220] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Controls Column */}
              <div className="space-y-5 lg:border-r lg:border-slate-800 lg:pr-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaLayerGroup className="text-purple-400" /> DDD Split Engine
                </h3>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    EXPENSE AMOUNT ($ USD):
                  </label>
                  <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    PRIMARY PAYER (CREDITOR):
                  </label>
                  <select
                    value={payer}
                    onChange={(e) => setPayer(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono focus:border-cyan-400 outline-none"
                  >
                    <option value="Mriganka">Mriganka (You)</option>
                    <option value="Alex">Alex</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Sam">Sam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    DISTRIBUTION ALGORITHM:
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'equal', label: 'Equal Split (Minor-Unit Remainder Safe)' },
                      { id: 'percent', label: 'Percentage Split (40% / 30% / 20% / 10%)' },
                      { id: 'custom', label: 'Weighted Proportional Allocation' },
                    ].map((mode) => (
                      <label
                        key={mode.id}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                          splitMode === mode.id
                            ? 'bg-purple-950/20 border-purple-400/60 text-white'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="splitMode"
                          checked={splitMode === mode.id}
                          onChange={() => setSplitMode(mode.id)}
                          className="accent-purple-500"
                        />
                        <span>{mode.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={calculateLedger}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-semibold text-sm transition-all shadow-md"
                  >
                    <FaPlay size={12} /> Generate Immutable Ledger
                  </button>
                  {ledgerEntries && (
                    <button
                      onClick={simulateReversal}
                      className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-mono transition-colors"
                    >
                      Simulate Reversing Entry (Audit Safety)
                    </button>
                  )}
                </div>
              </div>

              {/* Ledger Output Column */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Double-Entry Transaction Journal
                  </h4>
                  <span className="text-xs font-mono text-emerald-400">Invariant: Sum(Net) == $0.00</span>
                </div>

                {!ledgerEntries ? (
                  <div className="h-64 flex flex-col items-center justify-center bg-[#080c14] border border-dashed border-slate-800 rounded-xl p-8 text-center text-slate-500 text-sm">
                    <FaLayerGroup size={32} className="text-slate-700 mb-3" />
                    Click "Generate Immutable Ledger" to compute split distribution and inspect append-only journal entries.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-[#080c14] border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
                      <div className="grid grid-cols-5 bg-slate-900 px-4 py-2 text-slate-400 border-b border-slate-800 text-[11px]">
                        <div>TX REF</div>
                        <div>PARTICIPANT</div>
                        <div>OBLIGATION</div>
                        <div>NET POSTING</div>
                        <div>STATUS</div>
                      </div>
                      <div className="divide-y divide-slate-800/60">
                        {ledgerEntries.map((e) => (
                          <div key={e.id} className="grid grid-cols-5 px-4 py-3 items-center text-slate-200">
                            <span className="text-cyan-400">{e.id}</span>
                            <span className="font-semibold">{e.user}</span>
                            <span>${e.share}</span>
                            <span
                              className={`font-semibold ${
                                Number(e.net) > 0 ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {Number(e.net) > 0 ? `+$${e.net}` : `-$${Math.abs(e.net).toFixed(2)}`}
                            </span>
                            <span className="px-2 py-0.5 w-fit rounded bg-emerald-500/20 text-emerald-400 text-[10px]">
                              {isReversed ? 'REVERSED' : e.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {isReversed && (
                      <div className="p-3 bg-amber-950/20 border border-amber-500/40 rounded-xl text-xs font-mono text-amber-300">
                        <strong>Reversing Entry Generated:</strong> In accordance with append-only DDD ledger principles, the original transactions were not modified. Counterbalancing debit/credit entries with inverted signs were appended to the journal to restore zero balance.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SystemPlayground;
