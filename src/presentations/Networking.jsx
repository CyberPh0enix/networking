import React from 'react';
import { Slide } from '../components/Slide.jsx';
import { Terminal } from '../components/Terminal.jsx';
import { config } from '../config.js';

export const slides = [
  // Slide 1: Title
  {
    color: "cyan",
    component: ({ active }) => (
      <Slide active={active} color="cyan" alignCenter>
        <div className="speaker-badge stagger d-1" style={{ marginBottom: '2rem' }}>
          <div className="speaker-avatar"><i className={`fa-solid ${config.speaker.avatarIcon}`}></i></div>
          {config.speaker.role} // {config.speaker.name}
        </div>
        <h1 className="title-massive text-gradient grad-cyan stagger d-2">{config.presentation.title}</h1>
        <p className="stagger d-3" style={{ maxWidth: '900px', fontSize: '2rem' }}>{config.presentation.subtitle}</p>
        <div className="glass-panel stagger d-4" style={{ padding: '1rem 2rem', borderRadius: '50px', marginTop: '2rem' }}>
          <span className="mono" style={{ color: 'var(--cyan)', fontSize: '1rem' }}>
            [ <i className="fa-solid fa-network-wired"></i> Masterclass Session Init ]
          </span>
        </div>
      </Slide>
    )
  },
  // Slide 2: Domains & ICANN
  {
    color: "purple",
    component: ({ active }) => (
      <Slide active={active} color="purple">
        <h2 className="slide-title text-gradient grad-purple stagger d-1">
          <i className="fa-solid fa-address-book"></i> The Domain Market
        </h2>
        <div className="grid-2">
          <div className="flex-col-gap stagger d-2">
            <div className="glass-panel" style={{ borderLeft: '4px solid var(--purple)' }}>
              <h3 style={{ color: 'var(--purple)' }}>What is a Domain?</h3>
              <p>Humans can't memorize IPs like <span className="mono">142.250.190.46</span>. Domains act as aliases in a global phonebook.</p>
            </div>
            <div className="glass-panel" style={{ borderLeft: '4px solid var(--emerald)' }}>
              <h3 style={{ color: 'var(--emerald)' }}>ICANN</h3>
              <p>The <strong>Internet Corporation for Assigned Names and Numbers</strong>. They are the supreme non-profit governing body that controls the root DNS servers and delegates TLDs (.com, .org, .in).</p>
            </div>
          </div>
          <div className="glass-panel stagger d-3" style={{ textAlign: 'center', borderColor: 'var(--amber)' }}>
            <i className="fa-solid fa-store" style={{ fontSize: '3rem', color: 'var(--amber)', marginBottom: '1rem' }}></i>
            <h3 style={{ color: '#fff' }}>Domain Brokers (Registrars)</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>You don't <em>buy</em> a domain, you rent it.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>Companies like GoDaddy, Namecheap, and Cloudflare are essentially real-estate brokers. They pay a fixed fee to ICANN to register your name in the global registry for a specific duration.</p>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 3: The .ai Boom
  {
    color: "rose",
    component: ({ active }) => (
      <Slide active={active} color="rose" alignCenter>
        <h2 className="slide-title text-gradient grad-rose stagger d-1" style={{ justifyContent: 'center' }}>
          <i className="fa-solid fa-earth-americas"></i> The Domain Hack: .ai
        </h2>
        <div className="grid-2" style={{ width: '100%', maxWidth: '1200px', marginTop: '2rem' }}>
          <div className="glass-panel stagger d-2" style={{ padding: '3rem', textAlign: 'center', borderTop: '4px solid var(--emerald)' }}>
            <i className="fa-solid fa-umbrella-beach icon-massive" style={{ color: 'var(--emerald)' }}></i>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>The Origin (ccTLD)</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <span className="mono text-gradient grad-emerald" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>.ai</span> was created as a <strong>Country Code TLD</strong> exclusively for the tiny Caribbean island of <strong>Anguilla</strong>.
            </p>
          </div>
          <div className="glass-panel stagger d-3" style={{ padding: '3rem', textAlign: 'center', borderTop: '4px solid var(--purple)' }}>
            <i className="fa-solid fa-microchip icon-massive" style={{ color: 'var(--purple)' }}></i>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>The Boom (gTLD)</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Repurposed by the <strong>Artificial Intelligence</strong> boom, Anguilla now makes tens of millions of dollars just from tech companies renting their country's domain!
            </p>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 4: DNS Hierarchy & Traceroute
  {
    color: "cyan",
    component: ({ active }) => (
      <Slide active={active} color="cyan">
        <h2 className="slide-title text-gradient grad-cyan stagger d-1">
          <i className="fa-solid fa-sitemap"></i> DNS Resolution Hierarchy
        </h2>
        <div className="diagram-flex stagger d-2" style={{ marginBottom: '3rem' }}>
          <div className="node" style={{ borderColor: 'var(--purple)', boxShadow: '0 0 20px rgba(168,85,247,0.2)' }}>
            <i className="fa-solid fa-server" style={{ color: 'var(--purple)' }}></i>
            <h3 className="node-title">Root Server</h3>
            <div className="mono node-sub">"."</div>
          </div>
          <div className="arrow"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="node" style={{ borderColor: 'var(--cyan)', boxShadow: '0 0 20px rgba(0,242,254,0.2)' }}>
            <i className="fa-solid fa-server" style={{ color: 'var(--cyan)' }}></i>
            <h3 className="node-title">TLD Server</h3>
            <div className="mono node-sub">".com"</div>
          </div>
          <div className="arrow"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="node" style={{ borderColor: 'var(--emerald)', boxShadow: '0 0 20px rgba(16,185,129,0.2)' }}>
            <i className="fa-solid fa-server" style={{ color: 'var(--emerald)' }}></i>
            <h3 className="node-title">Authoritative</h3>
            <div className="mono node-sub">"google.com"</div>
          </div>
        </div>
        <div className="grid-2">
          <div className="glass-panel stagger d-3">
            <h3 style={{ color: 'var(--cyan)' }}>The Recursive Journey</h3>
            <p>When your browser asks <code>1.1.1.1</code> for google.com, it walks down this tree automatically, caching the result to speed up future requests.</p>
          </div>
          <div className="glass-panel stagger d-4" style={{ borderLeft: '4px solid var(--amber)' }}>
            <h3 style={{ color: 'var(--amber)' }}><i className="fa-solid fa-route"></i> Live Lab: Traceroute</h3>
            <p style={{ marginBottom: '1rem' }}>Let's see the physical path your packets take.</p>
            <Terminal cmd="traceroute 1.1.1.1" staggerClass="stagger d-5">
              <div style={{ color: 'var(--text-muted)' }}>1  192.168.1.1 (Router)  2.1ms</div>
              <div style={{ color: 'var(--text-muted)' }}>2  10.32.4.1 (ISP Gateway)  14.3ms</div>
              <div style={{ color: 'var(--emerald)' }}>3  1.1.1.1 (Cloudflare)  18.5ms</div>
            </Terminal>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 5: The IPv4 vs IPv6 Paradox
  {
    color: "amber",
    component: ({ active }) => (
      <Slide active={active} color="amber">
        <h2 className="slide-title text-gradient grad-amber stagger d-1">
          <i className="fa-solid fa-infinity"></i> The IPv4 vs IPv6 Paradox
        </h2>
        <div className="grid-2">
          <div className="glass-panel stagger d-2" style={{ borderColor: 'rgba(244, 63, 94, 0.4)' }}>
            <div><div className="concept-badge" style={{ color: 'var(--rose)' }}>1990s Band-Aid</div></div>
            <h3 style={{ color: 'var(--rose)', fontSize: '3rem' }}>NAT</h3>
            <p style={{ color: '#fff' }}>We ran out of the 4.3 billion IPs years ago.</p>
            <p>Network Address Translation let <strong>entire houses share 1 public IP</strong>, creating "Private IPs" (192.168.x.x).</p>
          </div>
          <div className="glass-panel stagger d-3" style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}>
            <div><div className="concept-badge" style={{ color: 'var(--emerald)' }}>The Modern Reality</div></div>
            <h3 style={{ color: 'var(--emerald)', fontSize: '3rem' }}>3.4 × 10³⁸ IPs</h3>
            <p style={{ color: '#fff' }}>Every device gets a globally routable public IP.</p>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h4 style={{ color: 'var(--amber)' }}>The Contradiction</h4>
              <p>Why do LANs still exist? For <strong>Security</strong> (Firewalls) and zero-cost local <strong>Switching</strong>.</p>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 6: Riddle: The Connection Timeout
  {
    color: "rose",
    component: ({ active }) => (
      <Slide active={active} color="rose" alignCenter>
        <h2 className="slide-title text-gradient grad-rose stagger d-1" style={{ justifyContent: 'center' }}>
          <i className="fa-solid fa-puzzle-piece"></i> Riddle: The Connection Timeout
        </h2>
        <div className="glass-panel stagger d-2" style={{ maxWidth: '900px', padding: '4rem', borderTop: '4px solid var(--rose)' }}>
          <i className="fa-solid fa-cubes icon-massive" style={{ color: 'var(--rose)' }}></i>
          <h3 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '2rem' }}>The Dilemma</h3>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            You just started a Minecraft server on your laptop. You text your friend to join. 
          </p>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            You tell them: <strong>"My IP is <span className="mono text-gradient grad-rose">192.168.1.5</span>"</strong>
          </p>
          <p style={{ fontWeight: 'bold', marginTop: '3rem', fontSize: '2rem', color: '#fff' }}>
            They can't connect. Why?
          </p>
        </div>
      </Slide>
    )
  },
  // Slide 7: The Reveal: Private IP Illusion
  {
    color: "emerald",
    component: ({ active }) => (
      <Slide active={active} color="emerald" alignCenter>
        <h2 className="slide-title text-gradient grad-emerald stagger d-1" style={{ justifyContent: 'center' }}>
          <i className="fa-solid fa-house-lock"></i> The Reveal: Private IP Illusion
        </h2>
        <div className="glass-panel stagger d-2" style={{ maxWidth: '900px', padding: '4rem', borderTop: '4px solid var(--emerald)' }}>
          <h3 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '2rem' }}>It's a Local Address</h3>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <span className="mono">192.168.x.x</span> is a private IP generated by your router's NAT. It does not exist on the global internet.
          </p>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', border: '1px solid var(--emerald)', borderRadius: '8px', marginTop: '2rem' }}>
            <p style={{ color: 'var(--emerald)', fontWeight: 'bold', fontSize: '1.5rem', margin: 0 }}>
              Giving someone that IP is like telling the post office your address is "Bedroom 3".<br /><br />Which house? Which city?
            </p>
          </div>
        </div>
      </Slide>
    )
  }
  // Slide 8: Interfaces & Ports
  {
    color: "emerald",
    component: ({ active }) => (
      <Slide active={active} color="emerald">
        <h2 className="slide-title text-gradient grad-emerald stagger d-1">
          <i className="fa-solid fa-door-open"></i> Interfaces & Ports
        </h2>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <ul className="sleek-list stagger d-2">
            <li>
              <i className="fa-solid fa-building" style={{ color: 'var(--emerald)' }}></i>
              <strong>IP = The Building:</strong> Routes packet to the machine.
            </li>
            <li>
              <i className="fa-solid fa-door-closed" style={{ color: 'var(--amber)' }}></i>
              <strong>Port = The Apartment:</strong> Routes packet to the specific App.
            </li>
            <li>
              <i className="fa-solid fa-lock" style={{ color: 'var(--rose)' }}></i>
              <strong>127.0.0.1 (Localhost):</strong> App listens only to internal OS.
            </li>
            <li>
              <i className="fa-solid fa-globe" style={{ color: 'var(--cyan)' }}></i>
              <strong>0.0.0.0 (Any):</strong> App listens on ALL interfaces.
            </li>
          </ul>
          <div className="stagger d-3" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ width: '100%', textAlign: 'center', padding: '2rem 1rem' }}>
              <h3 style={{ fontFamily: '"JetBrains Mono"', color: 'var(--emerald)', marginBottom: '2rem' }}>
                192.168.1.50
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem' }}>
                <div style={{ flex: 1, padding: '1.5rem 0', border: '2px solid rgba(255, 255, 255, 0.2)', borderBottom: 'none', borderRadius: '8px 8px 0 0', background: 'rgba(0, 0, 0, 0.5)' }}>
                  <h3 style={{ color: 'var(--cyan)', margin: 0 }}>80</h3>
                  <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Web</span>
                </div>
                <div style={{ flex: 1, padding: '1.5rem 0', border: '2px solid rgba(255, 255, 255, 0.2)', borderBottom: 'none', borderRadius: '8px 8px 0 0', background: 'rgba(0, 0, 0, 0.5)' }}>
                  <h3 style={{ color: 'var(--rose)', margin: 0 }}>22</h3>
                  <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>SSH</span>
                </div>
                <div style={{ flex: 1, padding: '1.5rem 0', border: '2px solid rgba(255, 255, 255, 0.2)', borderBottom: 'none', borderRadius: '8px 8px 0 0', background: 'rgba(0, 0, 0, 0.5)' }}>
                  <h3 style={{ color: 'var(--amber)', margin: 0 }}>25565</h3>
                  <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>MC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 9: The ISP Trap
  {
    color: "rose",
    component: ({ active }) => (
      <Slide active={active} color="rose">
        <h2 className="slide-title text-gradient grad-rose stagger d-1">
          <i className="fa-solid fa-box-archive"></i> The ISP Trap: CGNAT
        </h2>
        <div className="grid-2">
          <div className="glass-panel stagger d-2" style={{ borderColor: 'rgba(244, 63, 94, 0.4)' }}>
            <h3>Carrier-Grade NAT</h3>
            <p>ISPs hoard public IPs, placing you behind <em>another</em> giant router.</p>
            <div style={{ margin: '1.5rem 0', padding: '1rem', border: '2px dashed var(--rose)', borderRadius: '12px', textAlign: 'center' }}>
              <div className="mono" style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1rem' }}>ISP Router (142.x.x.x)</div>
              <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', border: '2px dashed var(--amber)', borderRadius: '8px' }}>
                <div className="mono" style={{ color: 'var(--amber)', marginBottom: '0.5rem', fontSize: '1rem' }}>Home Router (100.64.x.x)</div>
                <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '2px dashed var(--emerald)', borderRadius: '6px' }}>
                  <div className="mono" style={{ color: 'var(--emerald)', fontSize: '1rem' }}>Your PC (192.168.1)</div>
                </div>
              </div>
            </div>
            <h4 style={{ color: 'var(--rose)', textAlign: 'center' }}>Result: Port Forwarding is Dead.</h4>
          </div>
          <div className="flex-col-gap">
            <div className="glass-panel stagger d-3">
              <h3 style={{ color: 'var(--cyan)' }}>
                <i className="fa-solid fa-ban"></i> College Constraints
              </h3>
              <p>Our Wi-Fi uses <strong>Client Isolation</strong>. You can't ping the laptop next to you. Inbound blocked.</p>
            </div>
            <div className="glass-panel stagger d-4">
              <h3 style={{ color: 'var(--purple)' }}>
                <i className="fa-solid fa-arrow-rotate-left"></i> Hairpin NAT Crash
              </h3>
              <p>Connecting to your own public IP from inside? Cheap routers drop the packet.</p>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 10: LIVE LAB: HTTP Tunnel
  {
    color: "cyan",
    component: ({ active }) => (
      <Slide active={active} color="cyan">
        <h2 className="slide-title text-gradient grad-cyan stagger d-1">
          <i className="fa-solid fa-terminal"></i> LIVE LAB: Web Server Bypass
        </h2>
        <p className="stagger d-2" style={{ textAlign: 'center', color: '#fff', fontSize: '1.8rem', marginBottom: '2rem' }}>
          Since inbound is blocked, we punch a hole <strong>OUT</strong>.
        </p>
        <Terminal cmd="python3 -m http.server 8080" staggerClass="stagger d-3">
          <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Serving HTTP on 0.0.0.0 port 8080 ...</div>
          <div className="cmd">cloudflared tunnel --url http://localhost:8080</div>
          <div style={{ color: 'var(--text-muted)' }}>2026-09-02T19:05:16Z INF Requesting new quick Tunnel...</div>
          <div style={{ color: 'var(--text-muted)' }}>+---------------------------------------------------+</div>
          <div style={{ color: 'var(--text-muted)' }}>
            |<span className="hl-cyan" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>https://random-words.trycloudflare.com</span>|
          </div>
          <div style={{ color: 'var(--text-muted)' }}>+---------------------------------------------------+</div>
        </Terminal>
        <div className="stagger d-4" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div className="glass-panel" style={{ display: 'inline-block', padding: '1rem 2rem', borderColor: 'var(--amber)' }}>
            <h3 style={{ color: 'var(--amber)', margin: 0 }}>
              <i className="fa-solid fa-mobile-screen"></i> Connect via 5G now!
            </h3>
          </div>
        </div>
      </Slide>
    )
  }
];
