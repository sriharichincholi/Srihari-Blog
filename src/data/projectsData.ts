export interface Project {
  id: string;
  name: string;
  description: string;
  date: string;
  tags: string[];
  technologies: string[];
  details: string;
  image?: string;
  repoUrl?: string;
  demoUrl?: string;
  status?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "low-latency-order-book",
    name: "Low-Latency Order Book & Matching Engine",
    description: "High-throughput limit order book implementation in C++20 featuring lock-free ring buffers, custom arena allocators, and sub-microsecond price-time priority matching.",
    date: "2026-08-15",
    tags: ["Systems", "Low-Latency", "Quant"],
    technologies: ["C++20", "Lock-Free", "SIMD", "Google Benchmark"],
    details: `### High-Performance L3 Matching Engine

An optimized limit order book and order matching engine engineered for quantitative execution environments requiring deterministic microsecond latencies.

#### Key Architectural Highlights
- **Zero-Allocation Execution**: Custom fixed-size arena memory pools prevent runtime malloc contention during peak market volatility.
- **Lock-Free Concurrency**: Single-producer single-consumer (SPSC) ring buffers pass incoming market feeds to execution threads with zero lock overhead.
- **Cache-Optimized B-Tree Book**: Price levels stored in cache-friendly contiguous arrays maximizing L1/L2 cache hit ratios.
- **Microbenchmarking**: Benchmarked using Google Benchmark under synthetic L3 order stream simulations.

#### Performance Metrics
- Average order insert latency: **210 nanoseconds**
- Matching engine throughput: **> 4.5 million orders / second**
- Max P99.9 tail latency: **1.2 microseconds**`,
    repoUrl: "https://github.com/sriharichincholi/matching-engine",
    demoUrl: "https://demo.example.com/matching-engine",
    status: "Active Research"
  },
  {
    id: "simd-matrix-decomposition",
    name: "SIMD-Accelerated Matrix Factorization Library",
    description: "Numerical linear algebra library optimizing LU, QR, and Cholesky matrix factorizations using AVX-512 vector intrinsics and memory alignment.",
    date: "2026-06-10",
    tags: ["Algorithms", "Linear Algebra", "C++"],
    technologies: ["C++20", "AVX-512", "OpenMP", "Numerical Analysis"],
    details: `### Vectorized Matrix Decomposition Engine

High-performance numerical library for high-dimensional statistical covariance calculations and matrix factorizations utilized in quantitative portfolio optimization.

#### Implementation Features
- **AVX-512 Explicit Vectorization**: Hand-tuned SIMD intrinsics accelerating double-precision floating-point matrix multiplications.
- **Cache Blocking & Loop Tiling**: Optimized memory layout and row-major layout access patterns to fit CPU L2 cache boundaries.
- **Floating-Point Stability**: Implements partial pivoting and iterative refinement to preserve numerical precision in ill-conditioned matrices.

#### Benchmarks
- **4.2x speedup** over naive C++ implementations on 1000x1000 covariance matrices.
- Memory bandwidth saturation achieved across multi-threaded execution cores.`,
    repoUrl: "https://github.com/sriharichincholi/matrix-simd",
    status: "Completed"
  },
  {
    id: "itch-market-data-handler",
    name: "Sub-Microsecond ITCH 5.0 Feed Handler",
    description: "Zero-copy binary protocol parser for NASDAQ ITCH 5.0 feed streams, featuring socket ring buffer polling and static dispatch decoding.",
    date: "2026-04-02",
    tags: ["Networking", "Low-Latency", "C++"],
    technologies: ["C++20", "UDP Multicast", "Zero-Copy", "PCAP"],
    details: `### Zero-Copy ITCH Protocol Decoder

Direct binary market data feed handler capable of decoding multicast UDP packet streams in real-time.

#### Technical Implementation
- **Zero-Copy Memory Mapping**: Casts packet payload bytes directly into packed binary struct definitions without intermediary allocations.
- **Kernel-Bypass Polling**: Employs raw socket ring-buffer polling to eliminate kernel context-switch overhead.
- **Compile-Time Static Dispatch**: Template meta-programming dispatch replaces virtual function lookup overhead for message type routing.`,
    repoUrl: "https://github.com/sriharichincholi/itch-feed-handler",
    demoUrl: "https://demo.example.com/itch-feed-handler",
    status: "Completed"
  }
];
