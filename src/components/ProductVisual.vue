<script setup>
defineProps({
  type: {
    type: String,
    default: 'doctor-me',
    validator: (value) => ['doctor-me', 'mepos'].includes(value)
  }
})
</script>

<template>
  <div
    class="pmock"
    :class="`pmock-${type}`"
    role="img"
    :aria-label="type === 'doctor-me' ? 'Concept interface of a medical practice workspace' : 'Concept interface of a restaurant point-of-sale'"
  >
    <!-- Window chrome -->
    <div class="pmock-chrome">
      <span class="chrome-dot red" />
      <span class="chrome-dot yellow" />
      <span class="chrome-dot green" />
      <span class="chrome-title">{{ type === 'doctor-me' ? 'doctor.me — Workspace' : 'mePOS — Service' }}</span>
    </div>

    <!-- doctor.me: medical practice workspace -->
    <div
      v-if="type === 'doctor-me'"
      class="pmock-body doctor-body"
    >
      <aside class="doc-sidebar">
        <div class="doc-logo">
          +
        </div>
        <nav class="doc-nav">
          <span class="doc-nav-item active"><i />Dashboard</span>
          <span class="doc-nav-item"><i />Patients</span>
          <span class="doc-nav-item"><i />Appointments</span>
          <span class="doc-nav-item"><i />Consultations</span>
          <span class="doc-nav-item"><i />Prescriptions</span>
          <span class="doc-nav-item"><i />Finance</span>
        </nav>
        <div class="doc-profile">
          <span class="avatar">DS</span>
          <div>
            <span class="avatar-name">Dr. Salem</span>
            <span class="avatar-role">General practice</span>
          </div>
        </div>
      </aside>

      <div class="doc-main">
        <div class="doc-topbar">
          <div>
            <span class="doc-greeting">Good morning, Dr. Salem</span>
            <span class="doc-date">Tuesday, 14 Jul</span>
          </div>
          <span class="doc-search">Search patients…</span>
        </div>

        <div class="doc-stats">
          <div class="doc-stat">
            <strong>8</strong>
            <span>Today's visits</span>
          </div>
          <div class="doc-stat">
            <strong>3</strong>
            <span>New patients</span>
          </div>
          <div class="doc-stat">
            <strong>5</strong>
            <span>Prescriptions</span>
          </div>
          <div class="doc-stat">
            <strong>12</strong>
            <span>Invoices</span>
          </div>
        </div>

        <div class="doc-schedule">
          <div class="doc-panel-head">
            <span>Today's schedule</span>
            <span class="doc-panel-more">View calendar</span>
          </div>
          <div class="doc-visit">
            <span class="visit-time">09:00</span>
            <span class="visit-patient">Amine Ben Salah</span>
            <span class="visit-tag consult">Consultation</span>
          </div>
          <div class="doc-visit">
            <span class="visit-time">09:30</span>
            <span class="visit-patient">Sarah Mansour</span>
            <span class="visit-tag tele">Teleconsultation</span>
          </div>
          <div class="doc-visit">
            <span class="visit-time">10:15</span>
            <span class="visit-patient">Youssef Karoui</span>
            <span class="visit-tag follow">Follow-up</span>
          </div>
          <div class="doc-visit">
            <span class="visit-time">11:00</span>
            <span class="visit-patient">Lina Trabelsi</span>
            <span class="visit-tag consult">Consultation</span>
          </div>
        </div>
      </div>

      <aside class="doc-patient">
        <div class="doc-panel-head">
          <span>Patient file</span>
          <span class="doc-panel-more">Edit</span>
        </div>
        <div class="patient-card">
          <div class="patient-avatar">
            SB
          </div>
          <div>
            <strong>Salma Ben Ammar</strong>
            <span class="patient-meta">F · 34 · #P-2048</span>
          </div>
        </div>
        <ul class="patient-facts">
          <li><span>Last visit</span><strong>2 weeks ago</strong></li>
          <li><span>Allergies</span><strong>Penicillin</strong></li>
          <li><span>Prescriptions</span><strong>3 active</strong></li>
        </ul>
        <div class="patient-note">
          <span class="note-label">Latest note</span>
          <p>Blood pressure improving. Continue current treatment, review in 4 weeks.</p>
        </div>
      </aside>
    </div>

    <!-- mePOS: restaurant point of sale -->
    <div
      v-else
      class="pmock-body mepos-body"
    >
      <aside class="mepos-tabs">
        <span class="mepos-tab active">Salle</span>
        <span class="mepos-tab">Caisse</span>
        <span class="mepos-tab">Stock</span>
        <span class="mepos-tab">CRM</span>
      </aside>

      <div class="mepos-tables">
        <div class="mepos-panel-head">
          <span>Floor plan</span>
          <span class="mepos-more">12:40</span>
        </div>
        <div class="table-grid">
          <span class="table-cell occupied">T1<br><i>4 pers.</i></span>
          <span class="table-cell occupied">T2<br><i>2 pers.</i></span>
          <span class="table-cell free">T3<br><i>free</i></span>
          <span class="table-cell occupied">T4<br><i>6 pers.</i></span>
          <span class="table-cell free">T5<br><i>free</i></span>
          <span class="table-cell occupied">T6<br><i>3 pers.</i></span>
          <span class="table-cell active">T7<br><i>5 pers.</i></span>
          <span class="table-cell free">T8<br><i>free</i></span>
        </div>
        <div class="mepos-shift">
          <span class="shift-label">Current shift</span>
          <span class="shift-value">12:40 — €1,284.50</span>
        </div>
      </div>

      <div class="mepos-ticket">
        <div class="mepos-panel-head">
          <span>Table 7 — Ticket</span>
          <span class="mepos-more">#0041</span>
        </div>
        <ul class="ticket-lines">
          <li><span>Tagine poulet</span><span class="qty">×2</span><strong>28.00</strong></li>
          <li><span>Couscous royal</span><span class="qty">×1</span><strong>19.50</strong></li>
          <li><span>Merguez plate</span><span class="qty">×1</span><strong>15.00</strong></li>
          <li><span>Mint tea</span><span class="qty">×3</span><strong>9.00</strong></li>
          <li><span>Water 50cl</span><span class="qty">×2</span><strong>5.00</strong></li>
        </ul>
        <div class="ticket-total">
          <span>Total</span>
          <strong>€76.50</strong>
        </div>
        <div class="ticket-actions">
          <span class="ticket-btn ghost">Send to kitchen</span>
          <span class="ticket-btn solid">Charge</span>
        </div>
      </div>

      <aside class="mepos-kitchen">
        <div class="mepos-panel-head">
          <span>Kitchen</span>
          <span class="mepos-more">3 open</span>
        </div>
        <div class="kitchen-ticket">
          <span class="kitchen-table">T1 · 12:31</span>
          <ul>
            <li>2× Tagine poulet</li>
            <li>1× Salade mechouia</li>
          </ul>
          <span class="kitchen-status cooking">Cooking</span>
        </div>
        <div class="kitchen-ticket">
          <span class="kitchen-table">T7 · 12:38</span>
          <ul>
            <li>1× Couscous royal</li>
            <li>2× Merguez plate</li>
          </ul>
          <span class="kitchen-status queued">Queued</span>
        </div>
        <div class="kitchen-chart">
          <span class="chart-label">Sales today</span>
          <div class="chart-bars">
            <i style="height: 40%" />
            <i style="height: 65%" />
            <i style="height: 48%" />
            <i style="height: 82%" />
            <i style="height: 60%" />
            <i style="height: 92%" />
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pmock {
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: #0f0f17;
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  font-size: 11px;

  &-chrome {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px;
    background: #16161f;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    .chrome-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.14);

      &.red { background: #ff5f57; }
      &.yellow { background: #febc2e; }
      &.green { background: #28c840; }
    }

    .chrome-title {
      margin-left: 8px;
      font-family: $font-mono;
      font-size: 10px;
      color: rgba(248, 250, 252, 0.5);
    }
  }

  &-body {
    display: grid;
    min-height: 380px;
  }
}

// Shared bits
.pmock-panel-head,
.mepos-panel-head,
.doc-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: rgba(248, 250, 252, 0.85);
}

.pmock-panel-more,
.mepos-more {
  font-family: $font-mono;
  font-size: 9px;
  color: rgba(248, 250, 252, 0.4);
}

// ---------- doctor.me ----------
.doctor-body {
  grid-template-columns: 150px 1fr 190px;
  height: 400px;

  @include respond-to(mobile) {
    grid-template-columns: 110px 1fr;
    height: 360px;

    .doc-patient { display: none; }
  }
}

.doc-sidebar {
  background: #12121b;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding: 14px 12px;
  display: flex;
  flex-direction: column;

  .doc-logo {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    background: rgba(45, 212, 191, 0.18);
    color: #2dd4bf;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 18px;
  }

  .doc-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;

    .doc-nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 10px;
      border-radius: 8px;
      color: rgba(248, 250, 252, 0.55);
      font-size: 11px;

      i {
        width: 5px;
        height: 5px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.2);
      }

      &.active {
        background: rgba(45, 212, 191, 0.1);
        color: rgba(248, 250, 252, 0.95);

        i { background: #2dd4bf; }
      }
    }
  }

  .doc-profile {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);

    .avatar {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #2dd4bf;
      color: #0f0f17;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-name,
    .avatar-role {
      display: block;
      font-size: 10px;
      color: rgba(248, 250, 252, 0.8);
    }

    .avatar-role {
      font-size: 9px;
      color: rgba(248, 250, 252, 0.4);
    }
  }
}

.doc-main {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #101018;
  overflow: hidden;
}

.doc-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .doc-greeting {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: rgba(248, 250, 252, 0.9);
  }

  .doc-date {
    font-family: $font-mono;
    font-size: 9px;
    color: rgba(248, 250, 252, 0.4);
  }

  .doc-search {
    font-size: 10px;
    color: rgba(248, 250, 252, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 5px 10px;
  }
}

.doc-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  .doc-stat {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 10px;

    strong {
      display: block;
      font-size: 16px;
      color: rgba(248, 250, 252, 0.95);
    }

    span {
      font-size: 9px;
      color: rgba(248, 250, 252, 0.45);
    }
  }
}

.doc-schedule {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .doc-panel-head {
    margin-bottom: 4px;
  }
}

.doc-visit {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.05);

  .visit-time {
    font-family: $font-mono;
    font-size: 10px;
    color: rgba(248, 250, 252, 0.45);
    width: 34px;
  }

  .visit-patient {
    flex: 1;
    font-size: 11px;
    color: rgba(248, 250, 252, 0.85);
  }

  .visit-tag {
    font-size: 8.5px;
    padding: 3px 8px;
    border-radius: 999px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;

    &.consult { background: rgba(45, 212, 191, 0.12); color: #2dd4bf; }
    &.tele { background: rgba(161, 205, 244, 0.14); color: #a1cdf4; }
    &.follow { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
  }
}

.doc-patient {
  background: #12121b;
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.patient-card {
  display: flex;
  align-items: center;
  gap: 10px;

  .patient-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(45, 212, 191, 0.15);
    color: #2dd4bf;
    font-size: 10px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  strong {
    display: block;
    font-size: 11px;
    color: rgba(248, 250, 252, 0.9);
  }

  .patient-meta {
    font-family: $font-mono;
    font-size: 9px;
    color: rgba(248, 250, 252, 0.4);
  }
}

.patient-facts {
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    display: flex;
    justify-content: space-between;
    font-size: 10px;

    span { color: rgba(248, 250, 252, 0.4); }
    strong { color: rgba(248, 250, 252, 0.8); font-weight: 600; }
  }
}

.patient-note {
  background: rgba(45, 212, 191, 0.06);
  border: 1px solid rgba(45, 212, 191, 0.12);
  border-radius: 10px;
  padding: 10px;

  .note-label {
    font-family: $font-mono;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(45, 212, 191, 0.8);
  }

  p {
    margin-top: 6px;
    font-size: 10px;
    line-height: 1.5;
    color: rgba(248, 250, 252, 0.65);
  }
}

// ---------- mePOS ----------
.mepos-body {
  grid-template-columns: 64px 1fr 1.15fr 1fr;
  height: 400px;

  @include respond-to(mobile) {
    grid-template-columns: 52px 1fr 1.2fr;
    height: 360px;

    .mepos-kitchen { display: none; }
  }
}

.mepos-tabs {
  background: #12121b;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .mepos-tab {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-align: center;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(248, 250, 252, 0.4);
    padding: 10px 6px;
    border-radius: 8px;

    &.active {
      background: rgba(245, 158, 11, 0.12);
      color: #fbbf24;
    }
  }
}

.mepos-tables {
  padding: 14px;
  background: #101018;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .mepos-panel-head { margin-bottom: 2px; }
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;

  .table-cell {
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.025);
    padding: 10px 6px;
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    color: rgba(248, 250, 252, 0.8);
    line-height: 1.3;

    i {
      display: block;
      font-style: normal;
      font-size: 8.5px;
      font-weight: 500;
      color: rgba(248, 250, 252, 0.35);
    }

    &.occupied { border-color: rgba(251, 191, 36, 0.25); }
    &.free { opacity: 0.55; }
    &.active {
      border-color: #f59e0b;
      background: rgba(245, 158, 11, 0.12);
      color: #fbbf24;
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.08);
    }
  }
}

.mepos-shift {
  margin-top: auto;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 10px;

  .shift-label,
  .shift-value {
    display: block;
  }

  .shift-label {
    font-family: $font-mono;
    font-size: 8.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(248, 250, 252, 0.4);
  }

  .shift-value {
    font-size: 11px;
    font-weight: 600;
    color: #fbbf24;
    margin-top: 4px;
  }
}

.mepos-ticket {
  padding: 14px;
  background: #131320;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ticket-lines {
  display: flex;
  flex-direction: column;
  gap: 6px;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10.5px;
    color: rgba(248, 250, 252, 0.75);

    span:first-child { flex: 1; }

    .qty {
      color: rgba(248, 250, 252, 0.4);
      font-family: $font-mono;
      font-size: 9px;
    }

    strong {
      font-size: 10.5px;
      font-weight: 600;
      color: rgba(248, 250, 252, 0.9);
    }
  }
}

.ticket-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: 4px;
  border-top: 1px dashed rgba(255, 255, 255, 0.12);

  span {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(248, 250, 252, 0.45);
  }

  strong {
    font-size: 15px;
    color: #fbbf24;
  }
}

.ticket-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;

  .ticket-btn {
    flex: 1;
    text-align: center;
    font-size: 9.5px;
    font-weight: 600;
    padding: 8px;
    border-radius: 8px;

    &.ghost {
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: rgba(248, 250, 252, 0.7);
    }

    &.solid {
      background: #f59e0b;
      color: #0f0f17;
    }
  }
}

.mepos-kitchen {
  padding: 14px;
  background: #101018;
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kitchen-ticket {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 10px;

  .kitchen-table {
    font-family: $font-mono;
    font-size: 9px;
    color: rgba(248, 250, 252, 0.45);
  }

  ul {
    margin: 6px 0 8px;
    display: flex;
    flex-direction: column;
    gap: 3px;

    li {
      font-size: 10px;
      color: rgba(248, 250, 252, 0.75);
    }
  }

  .kitchen-status {
    font-size: 8.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 3px 8px;
    border-radius: 999px;

    &.cooking { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    &.queued { background: rgba(161, 205, 244, 0.14); color: #a1cdf4; }
  }
}

.kitchen-chart {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  .chart-label {
    font-family: $font-mono;
    font-size: 8.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(248, 250, 252, 0.4);
  }

  .chart-bars {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    height: 42px;
    margin-top: 8px;

    i {
      flex: 1;
      border-radius: 3px 3px 0 0;
      background: linear-gradient(180deg, rgba(245, 158, 11, 0.55), rgba(245, 158, 11, 0.12));
    }
  }
}
</style>
