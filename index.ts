//! Type-Sure :: Generic Type Testing Framework
//! Copyright (c) 2020  Joshua Coussard
//!
//!   This program is free software: you can redistribute it and/or modify
//! it under the terms of the GNU General Public License as published by
//! the Free Software Foundation, either version 3 of the License, or
//! (at your option) any later version.
//!
//!   This program is distributed in the hope that it will be useful,
//! but WITHOUT ANY WARRANTY; without even the implied warranty of
//! MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//! GNU General Public License for more details.
//!
//!   You should have received a copy of the GNU General Public License
//! along with this program.  If not, see <https://www.gnu.org/licenses/>.

export type IsNeverType<T> = [T] extends [never] ? true : false;
export type IsAnyType<T> = IsNeverType<any extends T ? never : false>;

export type ToMatch<A, B> = IsAnyType<A> | IsAnyType<B> extends true
  ? true
  : IsAnyType<A> extends true
  ? false
  : IsAnyType<B> extends true
  ? false
  : A | B extends A & B
  ? true
  : false;

export type ToExtend<A, B> = (A extends B ? true : false) extends true
  ? true
  : false;

export type Accept<T extends true> = T;
export type Reject<T extends false> = T;

// ---

interface TestAccept {
  pass_with_true______: Accept<true>;
  pass_with_self______: Accept<Accept<true>>;

  // fatal_with_false______: Accept<false>;
  // fatal_with_reject_____: Accept<Reject<false>>;
}

interface TestReject {
  pass_with_false______: Reject<false>;
  pass_with_self_______: Reject<Reject<false>>;

  // fatal_with_true______: Reject<true>;
  // fatal_with_accept____: Reject<Accept<true>>;
}

interface TestIsNeverType {
  pass_with_never_____________: Accept<IsNeverType<never>>;
  pass_with_never_intersection: Accept<IsNeverType<any & never>>;

  fail_with_any________: Reject<IsNeverType<any>>;
  fail_with_never_union: Reject<IsNeverType<any | never>>;
  fail_with_any_tuple__: Reject<IsNeverType<[any]>>;
  fail_with_never_tuple: Reject<IsNeverType<[never]>>;
  fail_with_boolean____: Reject<IsNeverType<boolean>>;
  fail_with_number_____: Reject<IsNeverType<number>>;
  fail_with_string_____: Reject<IsNeverType<string>>;
  fail_with_array______: Reject<IsNeverType<any[]>>;
  fail_with_record_____: Reject<IsNeverType<Record<string, never>>>;
  fail_with_iface______: Reject<IsNeverType<{}>>;
}

interface TestIsAnyType {
  pass_with_any______: Accept<IsAnyType<any>>;
  pass_with_any_union: Accept<IsAnyType<any | never>>;

  fail_with_never___________: Reject<IsAnyType<never>>;
  fail_with_any_intersection: Reject<IsAnyType<any & never>>;
  fail_with_any_tuple_______: Reject<IsAnyType<[any]>>;
  fail_with_never_tuple_____: Reject<IsAnyType<[never]>>;
  fail_with_boolean_________: Reject<IsAnyType<boolean>>;
  fail_with_number__________: Reject<IsAnyType<number>>;
  fail_with_string__________: Reject<IsAnyType<string>>;
  fail_with_array___________: Reject<IsAnyType<any[]>>;
  fail_with_record__________: Reject<IsAnyType<Record<string, any>>>;
  fail_with_iface___________: Reject<IsAnyType<{}>>;
}

interface TestToMatch {
  pass_with_any______: Accept<ToMatch<any, any>>;
  pass_with_any_union: Accept<ToMatch<any | never, any>>;

  pass_with_never___________: Accept<ToMatch<never, never>>;
  pass_with_any_intersection: Accept<ToMatch<any & never, never>>;
  pass_with_any_tuple_______: Accept<ToMatch<[any], [any]>>;
  pass_with_never_tuple_____: Accept<ToMatch<[never], [never]>>;
  pass_with_boolean_________: Accept<ToMatch<boolean, true | false>>;
  pass_with_number__________: Accept<ToMatch<number, number>>;
  pass_with_string__________: Accept<ToMatch<string, string>>;
  pass_with_array___________: Accept<ToMatch<any[], any[]>>;
  pass_with_record__________: Accept<
    ToMatch<Record<'a' | 'b', any>, { a: any; b: any }>
  >;
  pass_with_empty_iface_____: Accept<ToMatch<{}, {}>>;
  pass_with_omit_iface______: Accept<
    ToMatch<{ a: any }, Omit<{ a: any; b: any }, 'b'>>
  >;

  fail_number_isnt_string: Reject<ToMatch<number, string>>;
  fail_never_isnt_any____: Reject<ToMatch<never, any>>;
  fail_any_isnt_never____: Reject<ToMatch<any, never>>;
  fail_any_isnt_void_____: Reject<ToMatch<any, void>>;
  fail_any_isnt_undefined: Reject<ToMatch<any, undefined>>;
  fail_any_isnt_boolean__: Reject<ToMatch<any, boolean>>;
  fail_any_isnt_string___: Reject<ToMatch<any, string>>;
  fail_mismatch_iface____: Reject<
    ToMatch<{ a: number }, { a: number; b: number }>
  >;
  fail_mismatch_record___: Reject<
    ToMatch<Record<string, number>, { a: number; b: number }>
  >;
}

interface TestToExtend {
  pass_any______________: Accept<ToExtend<any, any>>;
  pass_never____________: Accept<ToExtend<never, never>>;
  pass_never_extends_any: Accept<ToExtend<never, any>>;
  fail_any_extends_never: Reject<ToExtend<any, never>>;

  pass_string_extends_keyof_any: Accept<ToExtend<string, keyof any>>;
  fail_keyof_any_extends_string: Reject<ToExtend<keyof any, string>>;
}
