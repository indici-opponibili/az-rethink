<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE VIEW users_contents_progress_count AS (
            SELECT u.id AS user_id, COUNT(p.id) AS amount FROM users as u
                LEFT JOIN content_progress as p ON p.user_id = u.id
            GROUP BY u.id
        )");

        DB::statement("CREATE VIEW users_courses_progress_count AS (
            SELECT u.id AS user_id, COUNT(p.id) AS amount FROM users as u
                LEFT JOIN course_progress as p ON p.user_id = u.id
            GROUP BY u.id
        )");

        DB::statement("CREATE VIEW users_achievements_count AS (
            SELECT u.id AS user_id, COUNT(p.id) AS amount FROM users as u
                LEFT JOIN achievements as p ON p.user_id = u.id
            GROUP BY u.id
        )");

        DB::statement("CREATE VIEW users_glossary_words_count AS (
            SELECT u.id AS user_id, COUNT(p.id) AS amount FROM users as u
                LEFT JOIN glossary_word_progress as p ON p.user_id = u.id
            GROUP BY u.id
        )");

        DB::statement("CREATE VIEW user_progress_aggregate_data AS (
            SELECT u.email,
                u_con.amount AS content_amount,
                u_cou.amount AS courses_amount,
                u_w.amount AS words_amount,
                u_a.amount achievements_amount
            FROM users as u
                LEFT JOIN users_contents_progress_count AS u_con ON u.id = u_con.user_id
                LEFT JOIN users_courses_progress_count AS u_cou ON u.id = u_cou.user_id
                LEFT JOIN users_achievements_count AS u_a ON u.id = u_a.user_id
                LEFT JOIN users_glossary_words_count AS u_w ON u.id = u_w.user_id
        )");

        /*
         * Ha una grossa limitazione:
         * La semantica è "numero medio di progressi di una categoria
         * per quelli che hanno almeno un progresso in quella categoria"
         * La limitazione è data dal fatto che non stiamo rispettando le forme normali del db

        DB::statement("CREATE VIEW user_content_category_average AS (
            SELECT uc.category, AVERAGE(u.category_amount) AS average_amount
            FROM (
                SELECT u.id, p.category, COUNT(p.id) as category_amount
                FROM users as u
                    JOIN content_progress AS p ON u.id = p.user_id
                GROUP BY u.id, p.category
            ) AS uc
            GROUP BY uc.category
        )");
        */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS users_contents_progress_count");
        DB::statement("DROP VIEW IF EXISTS users_courses_progress_count");
        DB::statement("DROP VIEW IF EXISTS users_achievements_count");
        DB::statement("DROP VIEW IF EXISTS users_glossary_words_count");
        DB::statement("DROP VIEW IF EXISTS user_progress_aggregate_data");
        DB::statement("DROP VIEW IF EXISTS user_content_category_average");
    }
};
