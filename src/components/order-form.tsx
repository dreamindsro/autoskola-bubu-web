"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";

export type PublicCourseOption = {
  id: string;
  title: string;
  group: string;
  offerings: readonly { branchId: string; price: string }[];
};

export type PublicBranchOption = { id: string; name: string };

function createIdempotencyKey() {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (character) =>
    (Number(character) ^ ((Math.random() * 16) >> (Number(character) / 4))).toString(16),
  );
}

type ApiState = {
  status: "idle" | "submitting" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export function OrderForm({
  courses,
  branches,
  initialCourseId,
  initialBranchId,
}: {
  courses: readonly PublicCourseOption[];
  branches: readonly PublicBranchOption[];
  initialCourseId: string;
  initialBranchId: string;
}) {
  const [courseId, setCourseId] = useState(initialCourseId);
  const [branchId, setBranchId] = useState(initialBranchId);
  const [formStartedAt] = useState(() => Date.now());
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [state, setState] = useState<ApiState>({ status: "idle" });

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === courseId) ?? courses[0],
    [courseId, courses],
  );
  const availableBranches = selectedCourse?.offerings ?? [];
  const selectedOffering =
    availableBranches.find((offering) => offering.branchId === branchId) ?? availableBranches[0];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const query = new URLSearchParams(window.location.search);
      const queriedCourse = courses.find((course) => course.id === query.get("kurz"));
      if (!queriedCourse) return;
      const queriedBranch = queriedCourse.offerings.find(
        (offering) => offering.branchId === query.get("pobocka"),
      );
      setCourseId(queriedCourse.id);
      setBranchId(
        queriedBranch?.branchId ?? queriedCourse.offerings[0]?.branchId ?? initialBranchId,
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, [courses, initialBranchId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "submitting") return;
    const form = new FormData(event.currentTarget);
    const requestKey = idempotencyKey || createIdempotencyKey();
    if (!idempotencyKey) setIdempotencyKey(requestKey);
    const payload = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      phone: form.get("phone"),
      courseId,
      branchId,
      note: form.get("note"),
      website: form.get("website"),
      formStartedAt,
      idempotencyKey: requestKey,
      termsAccepted: form.get("termsAccepted") === "on",
      privacyAccepted: form.get("privacyAccepted") === "on",
    };
    setState({ status: "submitting" });
    try {
      const result = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await result.json()) as {
        ok: boolean;
        message?: string;
        fieldErrors?: Record<string, string[]>;
      };
      if (!result.ok || !data.ok) {
        setState({
          status: "error",
          message: data.message || "Zkontrolujte formulář.",
          fieldErrors: data.fieldErrors,
        });
        return;
      }
      setState({ status: "success" });
    } catch {
      setState({ status: "error", message: "Připojení se nezdařilo. Zkuste to prosím znovu." });
    }
  }

  if (state.status === "success") {
    return (
      <section className="order-success" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <p className="eyebrow">Přihláška přijata</p>
        <h2>Děkujeme. Potvrzení je na cestě.</h2>
        <p>
          Vaši přihlášku přijal e-mailový provider pro vás i vybranou pobočku. Pobočka se vám ozve s
          dalšími kroky.
        </p>
        <Link className="btn btn-primary" href="/">
          Zpět na hlavní stránku
        </Link>
      </section>
    );
  }

  const error = (field: string) => state.fieldErrors?.[field]?.[0];
  return (
    <form className="order-form" onSubmit={submit} noValidate>
      <div className="order-form-heading">
        <p className="eyebrow">Nezávazná přihláška</p>
        <h2>Vyberte kurz a pobočku</h2>
        <p className="muted">
          Údaje odešleme pouze vybrané pobočce. Cena a dostupnost kombinace se znovu ověří na
          serveru.
        </p>
      </div>
      {state.status === "error" ? (
        <div className="form-alert" role="alert">
          {state.message}
        </div>
      ) : null}
      <div className="form-grid">
        <label>
          <span>Jméno</span>
          <input
            name="firstName"
            autoComplete="given-name"
            aria-invalid={Boolean(error("firstName"))}
          />
          {error("firstName") ? <small>{error("firstName")}</small> : null}
        </label>
        <label>
          <span>Příjmení</span>
          <input
            name="lastName"
            autoComplete="family-name"
            aria-invalid={Boolean(error("lastName"))}
          />
          {error("lastName") ? <small>{error("lastName")}</small> : null}
        </label>
        <label>
          <span>E-mail</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(error("email"))}
          />
          {error("email") ? <small>{error("email")}</small> : null}
        </label>
        <label>
          <span>Telefon</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+420 123 456 789"
            aria-invalid={Boolean(error("phone"))}
          />
          {error("phone") ? <small>{error("phone")}</small> : null}
        </label>
        <label>
          <span>Kurz</span>
          <select
            name="courseId"
            value={courseId}
            onChange={(event) => {
              const nextId = event.target.value;
              setCourseId(nextId);
              const nextCourse = courses.find((course) => course.id === nextId);
              setBranchId(nextCourse?.offerings[0]?.branchId ?? "");
            }}
          >
            {courses.map((course) => (
              <option value={course.id} key={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          {error("courseId") ? <small>{error("courseId")}</small> : null}
        </label>
        <label>
          <span>Pobočka</span>
          <select
            name="branchId"
            value={selectedOffering?.branchId ?? ""}
            onChange={(event) => setBranchId(event.target.value)}
          >
            {availableBranches.map((offering) => (
              <option value={offering.branchId} key={offering.branchId}>
                {branches.find((branch) => branch.id === offering.branchId)?.name}
              </option>
            ))}
          </select>
          {error("branchId") ? <small>{error("branchId")}</small> : null}
        </label>
      </div>
      <div className="selected-price" aria-live="polite">
        <span>Vybraná cena</span>
        <strong>{selectedOffering?.price}</strong>
        <small>Konečnou dostupnost potvrdí pobočka.</small>
      </div>
      <label>
        <span>
          Poznámka <em>(nepovinné)</em>
        </span>
        <textarea
          name="note"
          rows={4}
          maxLength={1000}
          placeholder="Napište nám, co potřebujete vědět."
        />
        {error("note") ? <small>{error("note")}</small> : null}
      </label>
      <label className="honeypot" aria-hidden="true">
        Web
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="consent-list">
        <label className="checkbox-label">
          <input name="termsAccepted" type="checkbox" />
          <span>
            Souhlasím s{" "}
            <Link href="/obchodni-podminky" target="_blank">
              obchodními podmínkami
            </Link>
            .
          </span>
        </label>
        {error("termsAccepted") ? <small>{error("termsAccepted")}</small> : null}
        <label className="checkbox-label">
          <input name="privacyAccepted" type="checkbox" />
          <span>
            Seznámil/a jsem se s{" "}
            <Link href="/ochrana-osobnich-udaju" target="_blank">
              ochranou osobních údajů
            </Link>
            .
          </span>
        </label>
        {error("privacyAccepted") ? <small>{error("privacyAccepted")}</small> : null}
      </div>
      <button
        className="btn btn-primary submit-button"
        type="submit"
        disabled={state.status === "submitting"}
      >
        {state.status === "submitting" ? "Odesílám…" : "Odeslat přihlášku →"}
      </button>
      <p className="form-footnote">
        Úspěch zobrazíme teprve po přijetí obou e-mailů poskytovatelem.
      </p>
    </form>
  );
}
